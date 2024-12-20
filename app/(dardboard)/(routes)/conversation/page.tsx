"use client";

import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import UserMessage from "@/components/dashboard/user-message";
import AiResponse from "@/components/dashboard/ai-response";
import { Textarea } from "@/components/ui/textarea";

import ToolsNavigation from "@/components/dashboard/tools-navigation";
import MarkdownResponse from "@/components/dashboard/markdown-responsive";
import { useProState } from "@/store/pro-store";

const ConversationPage = () => {
  const { handleOpenOrCloseProModal } = useProState();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
    setMessages,
  } = useChat({
    api: "/api/conversation",
  });

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newlines in the textarea
      handleSubmit(e);
    }
  };

  //Kiểm tra xem đã hết hạn bản dùng thử 1/5 chưa
  useEffect(() => {
    if (error) {
      const errorParsed = JSON.parse(error?.message);
      if (errorParsed?.status === 403) {
        handleOpenOrCloseProModal();
      }
    }
  }, [error, handleOpenOrCloseProModal]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    console.log({ messages });
  }, [messages]);

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-full relative flex flex-col justify-between">
      <div
        ref={containerRef}
        className="h-[calc(100vh-180px)] overflow-y-auto space-y-10 scroll-smooth"
      >
        {messages.length > 0 ? (
          <>
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? (
                  <UserMessage>
                    <MarkdownResponse content={m.content} />
                  </UserMessage>
                ) : (
                  <AiResponse>
                    <MarkdownResponse content={m.content} />
                  </AiResponse>
                )}
              </div>
            ))}
            <div className="absolute left-0 bottom-20 text-right w-full pr-3">
              <Button size="sm" onClick={handleClearChat} variant="outline">
                Clear chat
              </Button>
            </div>
          </>
        ) : (
          <ToolsNavigation title="Conversation" />
        )}
      </div>
      <div className="mb-[13px]">
        <form
          onSubmit={isLoading ? stop : handleSubmit}
          className="flex items-center w-full relative"
        >
          <Textarea
            placeholder="Do you have any questions today?"
            value={input}
            className="min-h-1 resize-none"
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            autoFocus
          />
          <Button
            type="submit"
            disabled={!input}
            className="absolute right-2 gradient-btn"
          >
            {isLoading ? "Stop" : <Send />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationPage;
