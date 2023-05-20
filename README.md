# Project Title: GPT Code Helper

This project is a browser extension designed to enrich the user experience with ChatGPT. The GPT Code Helper allows users to drag and drop multiple files, copy minimized code and disable the Enter key for sending prompts. Its objective is to maximize the use of tokens allowed by ChatGPT and facilitate passing entire code files, thus saving a considerable amount of tokens.

## Features

- **Drag and Drop Files**: Drop your files directly into the chat interface. Files will be automatically minimized to save tokens.
- **Minimized Code Copy**: Copy and paste your code directly into the chat, and it will be automatically minimized to save tokens.
- **Disable Enter**: By default, pressing the Enter key will send a message. This feature allows you to disable that, enabling multi-line messages without accidentally sending.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the latest version of Node.js and npm installed. If not, you can install them from [here](https://nodejs.org/en/download/).

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/fracergu/gpt-code-helper.git
    ```

2. Navigate to the project folder

   ```sh
   cd gpt-code-helper
   ```

3. Install NPM packages

   ```sh
    npm install
    ```

4. Build the project

    ```sh
     npm run build
     ```

After the build process is completed, a `dist` directory will be created. This directory contains the built extension.

## Load the extension manually in Chrome

1. Navigate to `chrome://extensions` in your Chrome browser.
2. Enable Developer mode by ticking the checkbox in the upper-right corner.
3. Click on the "Load unpacked extension" button.
4. Navigate to the `dist` directory of the project and click "OK".

The extension should now be visible in your list of Chrome extensions.

## Contributing

I would love to see you contributing to the project, whether that's by reporting bugs, discussing improvements, or contributing code.

## License

Distributed under the MIT License. 
