/**
 * WEB222 – Assignment 02
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name: Khanh Anh Kiet Nguyen
 *      Student ID: 170049233
 *      Date: 20 Sep, 2024
 *
 * Please see all unit tests in the files problem-01.test.js, problem-02.test.js, etc.
 */

/*******************************************************************************
 * Problem 01: Building a Chat Completions API URL
 *
 * When we program with AI systems like OpenAI, we often use Chat Completions.
 * With Chat Completions, you can send a list of messages between an AI
 * assistant and a user, and get back the next message (i.e., it "completes" the
 * chat for you).
 *
 * Different companies and providers expose Chat Completion endpoints as URLs
 * Your task is to write a function that constructs a valid Chat Completion URL
 * for accessing a Chat Completions API. The function will receive a `baseUrl`
 * argument, which could be in various formats (with or without a trailing slash,
 * different domains, etc.). The function should correctly append the path
 * `/chat/completions` to the `baseUrl` to form a proper URL.
 *
 * Examples of base URLs and their expected outputs:
 * - Input: "https://api.openai.com/v1" -> Output: "https://api.openai.com/v1/chat/completions"
 * - Input: "https://api.openai.com/v1/" -> Output: "https://api.openai.com/v1/chat/completions"
 * - Input: "https://openrouter.ai/api/v1/" -> Output: "https://openrouter.ai/api/v1/chat/completions"
 * - Input: "http://localhost:3000" -> Output: "http://localhost:3000/chat/completions"
 *
 ******************************************************************************/
function buildChatApiUrl(baseUrl) {
  // TODO: Implement the function to correctly handle different baseUrls and append the path
  if(!baseUrl)
      throw new Error("Invalid Url");
  while(baseUrl.endsWith('/'))
  {
    baseUrl = baseUrl.slice(0,-1);
  }
  return `${baseUrl}/chat/completions`;
    
}

/*******************************************************************************
 * Problem 02: Validate an API Key Format
 *
 * In order to use AI endpoints like Chat Completions, we often need to provide
 * an API Key. These are like a combination of a username and password in a single
 * string.
 *
 * Write a function that validates the format of a fictional API key using a
 * regular expression. The API key format is defined as follows:
 *
 * Format: "API-KEY-1234-XXXX" where "XXXX" can be any combination of four
 * alphanumeric characters (letters and numbers).
 *
 * Examples of valid API keys:
 * - "API-KEY-1234-ABCD"
 * - "API-KEY-1234-9876"
 * - "API-KEY-1234-A1B2"
 *
 * Examples of invalid API keys:
 * - "API-KEY-123-ABCD" (incorrect section length)
 * - "APIKEY-1234-ABCD" (missing dashes)
 * - "API-KEY-1234-ABCDE" (too many characters in the last section)
 *
 * Implement the function `isValidApiKey` that takes an `apiKey` string and
 * returns `true` if the format is correct, otherwise `false`.
 ******************************************************************************/
function isValidApiKey(apiKey) {
  // TODO: Implement the function using a regular expression to validate the apiKey
  let regrex = /API-KEY-\d{4}-[A-Z0-9]{4}$/;
  return regrex.test(apiKey);
}

/*******************************************************************************
 * Problem 03: Masking an API Key
 *
 * When we log API Keys, or other sensitive data, we often want to mask them
 * so that we don't leak this information by accident (e.g., consider what
 * happens when you type your password and see ******** instead).
 *
 * Write a function that masks an API key for safe logging. The API key has
 * the format "API-KEY-1234-XXXX", where "XXXX" can be any
 * combination of four alphanumeric characters. The masked version should
 * return "API-KEY-1234-***X", where only the final character of the "XXXX"
 * segment is visible and the rest are replaced with asterisks '*'.
 *
 * Before masking, the API key should be validated using your `isValidApiKey`
 * function from the previous question. If the API key is valid, apply the
 * mask; otherwise, return the original API key unchanged.
 ******************************************************************************/
function maskApiKey(apiKey) {
  // TODO: Implement the function to mask the API key except for the last character of the segment
  if(!isValidApiKey(apiKey)) return apiKey;
  return apiKey.slice(0,-4)+'***'+apiKey.slice(-1);
}

/*******************************************************************************
 * Problem 04: Checking if a model is supported
 *
 * When making a chat completion request, we include a list of `messages` as
 * well as a `model` to use.  We need to make sure that the model is supported.
 *
 * Write a function that checks if the model used in a Chat
 * Completion request is supported. The function will receive a `chatCompletion`
 * object and a `supportedModels` array. The `chatCompletion` argument is an
 * object that includes a `model` property, for example:
 *
 * {
 *   "model": "gpt-4o",
 *   "messages": [
 *     {
 *       "role": "system",
 *       "content": "You are a helpful assistant."
 *     },
 *     {
 *       "role": "user",
 *       "content": "Hello!"
 *     }
 *   ]
 * }
 *
 * The `supportedModels` argument is an Array of objects, where each
 * object has an `id` that represents a model, for example:
 *
 * [
 *   {
 *     "id": "model-id-0",
 *     "object": "model",
 *     "created": 1686935002,
 *     "owned_by": "organization-owner"
 *   },
 *   {
 *     "id": "model-id-1",
 *     "object": "model",
 *     "created": 1686935002,
 *     "owned_by": "organization-owner",
 *   },
 *   {
 *     "id": "gpt-4o",
 *     "object": "model",
 *     "created": 1686935002,
 *     "owned_by": "openai"
 *   },
 * ]
 *
 * Implement the function `isModelSupported` that takes a `chatCompletion` object
 * and a `suppwortedModels` array, and returns `true` if the model chosen is
 * represented in the list of `supportedModels` (i.e., its `id`), or false if not.
 ******************************************************************************/
function isModelSupported(chatCompletion, supportedModels) {
  // TODO: Implement the function to check if the model in chatCompletion is supported
  if(!supportedModels) throw new Error("Don't have any model");
  if(!chatCompletion) throw new Error("Chat completion is null");
  for(let i = 0; i<supportedModels.length;i++)
  {
    if(chatCompletion.model === supportedModels[i].id) return true;
  }
  return false;
}

/*******************************************************************************
 * Problem 05: Filtering Chat Completion Messages
 *
 * A Chat Completion request contains a `model` and a set of `messages`, which
 * are objects representing a conversation between an AI `assistant` and a `user`.
 *
 * Write a function that extracts messages based on the specified role (e.g.,
 * 'assistant' or 'user'). The function should throw an error if the role
 * is neither 'assistant' nor 'user'.
 *
 * Example of a Chat Completion object:
 * {
 *   "model": "gpt-4o",
 *   "messages": [
 *     {
 *       "role": "assistant",
 *       "content": "How can I help you today?"
 *     },
 *     {
 *       "role": "user",
 *       "content": "Hello!"
 *     },
 *     {
 *       "role": "assistant",
 *       "content": "Hello, how are you?"
 *     }
 *   ]
 * }
 *
 * Implement the function `getMessages` that takes a `chatCompletion` object and
 * a `role` string, and returns an array of message objects for the specified role.
 ******************************************************************************/
function getMessages(chatCompletion, role) {
  // TODO: Implement the function to filter messages by role and handle errors
  if(role !== 'assistant' && role !== 'user') throw new Error("Unvalid role");
  if(!chatCompletion.messages) throw new Error("Don't have any message in chat");
  let listMessage = [];
  for(let i = 0;i<chatCompletion.messages.length;i++)
  {
    if(chatCompletion.messages[i].role === role)
    {
      listMessage.push(chatCompletion.messages[i]);
    }
  }
  return listMessage;
}

/*******************************************************************************
 * Problem 06: Total Characters in All Chat Messages
 *
 * You are given a chat completion request object that contains a `model` and a
 * set of `messages`. Each message is an object representing a conversation
 * between an AI `assistant` and a `user`. Each message object has a `role`
 * (either "assistant" or "user") and a `content` string.
 *
 * Write a function that calculates the total number of characters in all
 * messages' content in the chat.
 *
 * Example of a chat completion request:
 *
 * {
 *   "model": "gpt-4o",
 *   "messages": [
 *     {
 *       "role": "assistant",
 *       "content": "How can I help you today?"
 *     },
 *     {
 *       "role": "user",
 *       "content": "Hello!"
 *     },
 *     {
 *       "role": "assistant",
 *       "content": "Hello, how are you?"
 *     }
 *   ]
 * }
 *
 * Implement the function `countTotalCharacters` that takes a chat object and
 * returns the total number of characters in all messages' content.
 ******************************************************************************/
function countTotalCharacters(chat) {
  // TODO: Implement the function to count all characters in messages' content
  let count = 0;
  for(let i = 0;i<chat.messages.length;i++)
    {
      count+= chat.messages[i].content.length;
    }
  return count;
}

/*******************************************************************************
 * Problem 07: Trimming Chat Completion Messages
 *
 * A Chat Completion request contains a `model` and a set of `messages`, which
 * are objects representing a conversation between an AI `assistant` and a `user`.
 * Each message has a `role` ("assistant" or "user") and `content` (the text of
 * the message).
 *
 * Write a function `trimChatMessages` that takes:
 * - `chatCompletion`: an object containing `model` and `messages`
 * - `maxCharacters`: a maximum number of characters allowed for all messages combined
 * - `trimDirection`: a string that can be either "start" or "end", indicating
 *   where messages should be removed to fit within the `maxCharacters` limit.
 *
 * The function should modify the `messages` array in the `chatCompletion` object
 * to ensure the total number of characters in the `content` of all messages does
 * not exceed `maxCharacters`. Messages should be removed from the "start" or
 * "end" of the array based on `trimDirection`.
 *
 * If the chosen `maxCharacters` value would require all messages to be removed,
 * throw an error.
 ******************************************************************************/
function trimChatMessages(chatCompletion, maxCharacters, trimDirection) {
  // TODO: Implement the function to trim messages based on the total character limit
  let curLength = countTotalCharacters(chatCompletion);
  if(curLength < maxCharacters) return chatCompletion.messages;
  while(curLength > maxCharacters)
  {
    if(trimDirection === 'end') chatCompletion.messages = chatCompletion.messages.slice(0,-1);
    else if(trimDirection === 'start')  chatCompletion.messages = chatCompletion.messages.slice(1);
    else{
      throw new Error('Trimming all messages is necessary to meet the maxCharacters limit, which is not allowed.');
    }
    curLength = countTotalCharacters(chatCompletion);
  }
  if(chatCompletion.messages.length === 0) throw new Error('Trimming all messages is necessary to meet the maxCharacters limit, which is not allowed.');
  return chatCompletion.messages;
}

/*******************************************************************************
 * Problem 08 (Part 1): Formatting a Chat Completion Request into HTML
 *
 * Write a function that takes a chatCompletion object, which
 * includes a `model` and a set of `messages` between an AI `assistant` and a
 * `user`, and returns an HTML formatted string using HTML elements to display
 * it.
 *
 * The function should return an HTML string that formats these messages within
 * an `<article>` element, where each message is wrapped in a `<section>` tag.
 * The `model` should also be included in a `<header>` within the `<article>`.
 * Use class attributes to style messages differently based on the role
 * (e.g., different colors for user vs. assistant).
 *
 * Example of expected HTML output:
 *
 * <article>
 *   <header>Model: gpt-4o</header>
 *   <section class="assistant">Assistant: How can I help you today?</section>
 *   <section class="user">User: Hello!</section>
 *   <section class="assistant">Assistant: Hello, how are you?</section>
 * </article>
 *
 * In your solution, use a `for-of` loop.
 ******************************************************************************/
function formatChatCompletionToHTML(chatCompletion) {
  // TODO: Implement the function to format the chatCompletion object into HTML
  let rows = [];
  rows.push("<article>\n");
  rows.push(`        <header>Model: ${chatCompletion.model}</header>\n`);
  for(let i = 0;i<chatCompletion.messages.length;i++)
  {
    let UpperCaseFirstLetterInRole = chatCompletion.messages[i].role.charAt(0).toUpperCase() + chatCompletion.messages[i].role.slice(1); 
    rows.push(`        <section class="${chatCompletion.messages[i].role}">${UpperCaseFirstLetterInRole}: ${chatCompletion.messages[i].content}</section>\n`);
  }
  rows.push("      </article>");
  return rows.join(''); 
}

/*******************************************************************************
 * Problem 08 (Part 2): Formatting a Chat Completion Request into HTML
 *
 * Re-implement your solution from Problem 8 Part 1, but use the Array's map()
 * method this time instead of a for-of loop.
 ******************************************************************************/
function formatChatCompletionToHTML2(chatCompletion) {
  // TODO: Implement the function to format the chatCompletion object into HTML
  // Start by adding the <article> tag and the model in the <header>
  let header = `        <header>Model: ${chatCompletion.model}</header>\n`;

  // Use map() to generate the HTML for each message and join them into a string
  let messagesHTML = chatCompletion.messages
    .map(message => {
      let capitalizedRole = message.role.charAt(0).toUpperCase() + message.role.slice(1);
      return `        <section class="${message.role}">${capitalizedRole}: ${message.content}</section>\n`;
    })
    .join('');

  // Combine the header and messages, and wrap everything in an <article> tag
  return `<article>\n${header}${messagesHTML}      </article>`;
}

/*******************************************************************************
 * Problem 09: Adding a 'name' property to 'user' messages
 *
 * A Chat Completion request contains a `model` and a set of `messages`, which
 * are objects representing a conversation between an AI `assistant` and a `user`:
 *
 * Each message can also optionally contain a `name` property, which is any string
 * that represents the name of an assistant or user.
 *
 * Implement the function `addUserName` that takes a `chatData` chat completion
 * object and a `defaultName` string. The function should add the `defaultName`
 * as the `name` property to all 'user' messages in the `messages` array that do
 * not already have a `name` property (i.e., leave existing names alone).
 *
 * In your solution, use the Array's forEach() method.
 ******************************************************************************/
function addUserName(chatData, defaultName) {
  // TODO: Implement the function to add a 'name' property to 'user' messages
}

/*******************************************************************************
 * Problem 10: Copying System Prompts in Chat Completions
 *
 * A Chat Completion request contains a `model` and a set of `messages`, which
 * are objects representing a conversation between an AI `assistant` and a `user`.
 * It can also optionally include one or more `system` prompt messages at the
 * start, which help instruct the model how to respond.  A system prompt message
 * looks just like a "user" or "assistant" message, but uses the "system" role:
 *
 * { role: "system", content: "Instructions to model..." }
 *
 * Write a function that copies system prompt messages from the
 * start of one Chat Completion request (source) to another (target), replacing
 * any existing system prompt(s) in the target. The user/assistant messages in
 * the target should remain unchanged.
 *
 * Implement the function `copySystemPrompts(source, target)` where `source` and
 * `target` are both objects representing Chat Completion requests.
 ******************************************************************************/
function copySystemPrompts(source, target) {
  // TODO: Implement the function to copy system prompts from source to target
}

export {
  buildChatApiUrl,
  isValidApiKey,
  maskApiKey,
  isModelSupported,
  getMessages,
  countTotalCharacters,
  trimChatMessages,
  formatChatCompletionToHTML,
  formatChatCompletionToHTML2,
  addUserName,
  copySystemPrompts
};
