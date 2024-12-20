
import OpenAI from 'openai';
import { NextResponse } from "next/server";


const configuration = {
    apiKey: process.env.OPENAI_API_KEY!,
};

const openai = new OpenAI(configuration);

export async function POST(req: Request) {
    try {

        const { prompt, amount, resolution, model, style } = await req.json();


        if (!configuration.apiKey) {
            return new NextResponse("Miss OpenAI API Key.", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }






        const response = await openai.images.generate({
            model,
            prompt,
            n: Number(amount),
            size: resolution,
            style
        });



        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json({ name, status, headers, message }, { status });
        } else {
            throw error;
        }
    }
}