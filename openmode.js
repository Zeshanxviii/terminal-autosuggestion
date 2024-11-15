// import readline from 'readline';
// import chalk from 'chalk';
// import dotenv from 'dotenv';
// import { openai } from '@ai-sdk/openai';

// dotenv.config();

// const model = openai('gpt-3.5-turbo');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let buffer = '';
// let suggestions = [];
// let selectedIndex = -1;

// async function getSuggestions(input) {
//   try {
//     const response = await model.generateText({
//       prompt: `Suggest up to 3 bash commands based on this description: ${input}. Format the response as a JSON array of objects with 'command' and 'description' fields.`,
//       max_tokens: 150,
//       temperature: 0.7,
//     });
    
//     return JSON.parse(response.text);
//   } catch (error) {
//     console.error('Error getting AI suggestions:', error);
//     return [];
//   }
// }

// function displayPrompt() {
//   process.stdout.write('\x1b[2K\r');  // Clear the current line
//   process.stdout.write(chalk.cyan('$ ') + buffer);
//   if (suggestions.length > 0) {
//     console.log('\n' + suggestions.map((s, i) => 
//       `  ${i === selectedIndex ? '>' : ' '} ${chalk.green(s.command)}: ${s.description}`
//     ).join('\n'));
//   }
// }

// rl.input.on('keypress', async (_, key) => {
//   if (key.name === 'return') {
//     console.log('\nExecuting:', buffer);
//     buffer = '';
//     suggestions = [];
//     selectedIndex = -1;
//   } else if (key.name === 'backspace') {
//     buffer = buffer.slice(0, -1);
//   } else if (key.name === 'tab') {
//     if (suggestions.length > 0) {
//       if (selectedIndex === -1) {
//         selectedIndex = 0;
//       } else {
//         buffer = suggestions[selectedIndex].command;
//         suggestions = [];
//         selectedIndex = -1;
//       }
//     }
//   } else if (key.name === 'up' && selectedIndex > 0) {
//     selectedIndex--;
//   } else if (key.name === 'down' && selectedIndex < suggestions.length - 1) {
//     selectedIndex++;
//   } else if (key.sequence) {
//     buffer += key.sequence;
//   }

//   if (buffer.length > 0) {
//     suggestions = await getSuggestions(buffer);
//     selectedIndex = -1;
//   } else {
//     suggestions = [];
//     selectedIndex = -1;
//   }

//   displayPrompt();
// });

// console.log(chalk.yellow('AI Command Suggester'));
// console.log(chalk.green('Start typing a command description, and AI will suggest commands.'));
// console.log(chalk.green('Use Up/Down arrows to navigate suggestions, Tab to select, Enter to execute, or Ctrl+C to exit.'));
// displayPrompt();

// rl.on('SIGINT', () => {
//   console.log(chalk.red('\nExiting AI Command Suggester'));
//   process.exit();
// });