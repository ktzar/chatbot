# Chatbot

This is a simple chatbot that connects to an IRC server, one or multiple channels and waits for private messages to start interacting with users.
At the moment it's very simple and only includes a few variations and randomised answers based on cues from the incoming messages.

A few servers are included in the index.js file. Eventually this'll come from a config file or env vars.

## How to run:
Check out this repo. Copy `.env_example` to `.env`, edit the parameters, and run:
```sh
npm i
node index
```

## TODO
- Conversation tree with cues to leave a specific node and go to the next one.
