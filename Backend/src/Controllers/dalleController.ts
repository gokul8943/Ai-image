import { Request, Response } from "express";
import Configuration, { OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);

export const dalleController = {
  async generateImage(req: Request, res: Response): Promise<void> {

    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ message: "Invalid or missing prompt" });
      return;
    }
    try {
      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error: any) {
      console.error("Error generating image:", error);
      res.status(500).send(
        error?.response?.data?.error?.message || "Something went wrong"
      );
    }
  },
};
