import { BrainCircuit } from "lucide-react";
import Image from "next/image";

interface AiResponseProps {
  children: React.ReactNode;
}

const AiResponse: React.FC<AiResponseProps> = ({ children }) => {
  return (
    <div className="p-4 pb-10 ml-20 rounded-xl mr-7 bg-secondary relative">
      {children}
      <div className="bg-sky-500 w-14 h-14 rounded-lg flex justify-center items-center absolute -bottom-6 right-6">
        {/* <BrainCircuit color="white" size={40} /> */}
        <Image src="/logo.png" width={40} height={40} alt="logo" className="rounded" />
      </div>
    </div>
  )
}

export default AiResponse;