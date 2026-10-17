import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // access to gemini api from .env file
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ai", async (req, res) => {
    try {
        const response = await ai.models.generateContentStream({
            model: "gemini-3.8-flash",
            contents: "hello",
        });
        let fullResponse = "";
        for await (const chunk of response) {
            if (chunk.text) {
                fullResponse += chunk.text;
            }
        }
        res.send(fullResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating content");
    }
});

app.listen(port, () => { // to run server use the listen function 
  console.log(`server strated in port ${port}`);
});