# Jarvis Chatbot with premAI.io

My submission for [Prem Challenge x LangChain](https://github.com/premAI-io/challenge-with-langchain) ([1st place](https://medium.com/prem-blog/announcing-the-winners-of-the-prem-challenge-with-langchain-c666cae6b951))

I used:

- `Whisper Tiny` to convert audio to text
- `Bark` to convert text to audio
- `Vicuna 7B Q4` and `Dolly v2 12B` as language models

## How to set it up

- Download the project
- Run `npm install`
- Copy `.env.example` to `.env` and fill out the variables.
- Run `npm run dev`

## Examples

![First question](./examples/first_question.png)
![Second question](./examples/second_question.png)
