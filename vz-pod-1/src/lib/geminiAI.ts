// import { messages, chat , toStreamResponse } from "@tanstack/ai";
// import { gemini } from "@tanstack/ai-gemini";
// const aiAdapter = gemini();

import { GoogleGenAI, type Content } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const getAIResponse = async (fullPrompt: string) => {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: fullPrompt
    });
    return response;
}

export const getChat = async (history: Content[]) => {
    const genAI = ai
    const chat = genAI.chats.create({
        model: "gemini-3-flash-preview",
        history
        // history: [
        //     {
        //         role: "user",
        //         parts: [{ text: "Hello, how are you?" }],
        //     },
        //     {
        //         role: "model",
        //         parts: [{ text: "I'm doing well, thank you! How can I assist you today?" }],
        //     },
        // ]
    });
    return chat;
}
