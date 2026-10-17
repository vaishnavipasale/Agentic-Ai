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

//
const main = async () => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: "hello",
        });
        console.log(response.text);
    } catch (error) {
        console.error(error);
    }
}

main();

app.listen(port, () => { // to run server use the listen function 
  console.log(`server strated in port ${port}`);
});