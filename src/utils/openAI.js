import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./geminikey";

const client = new GoogleGenerativeAI(GEMINI_KEY);

export default client;
