import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json());

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.status(200).send("port 2000 and opneai working");
});

app.post("/send_test_messages", async (req, res) => {
  const query = req.body.text;
  console.log(query);
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: query,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).send(completion.data.choices[0].text);
    console.log(completion.data.choices[0].text);
  } catch (err) {
    res.send("this in an error");
    console.log(err.message);
  }
});

app.listen(2000, () => {
  console.log("listening on 2000");
});
