import readline from 'readline';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let suggestions = [];
let selectedIndex = 0;

async function getSuggestions(input) {
  const currentDir = process.cwd();
  const files = await fs.readdir(currentDir);
  return files.filter(file => file.startsWith(input));
}

function displaySuggestions() {
  console.clear();
  process.stdout.write(chalk.cyan('Enter a file or folder name: '));
  process.stdout.write(rl.line);
  
  suggestions.forEach((suggestion, index) => {
    const line = index === selectedIndex ? 
      chalk.green('> ' + suggestion) : 
      '  ' + suggestion;
    console.log(line);
  });
}

async function updateSuggestions() {
  suggestions = await getSuggestions(rl.line);
  selectedIndex = 0;
  displaySuggestions();
}

function animateCursor() {
  const frames = ['-', '\\', '|', '/'];
  let i = 0;
  return setInterval(() => {
    process.stdout.write(`\r${chalk.yellow(frames[i])}`);
    i = (i + 1) % frames.length;
  }, 100);
}

rl.on('line', (input) => {
  if (input === '') {
    console.log(chalk.green('Exiting...'));
    rl.close();
  } else if (suggestions[selectedIndex]) {
    console.log(chalk.green(`Selected: ${suggestions[selectedIndex]}`));
    rl.close();
  }
});

rl.on('close', () => {
  process.exit(0);
});

rl.input.on('keypress', (_, key) => {
  if (key.name === 'down' && selectedIndex < suggestions.length - 1) {
    selectedIndex++;
    displaySuggestions();
  } else if (key.name === 'up' && selectedIndex > 0) {
    selectedIndex--;
    displaySuggestions();
  }
});

rl.on('SIGINT', () => {
  console.log(chalk.red('\nProgram terminated.'));
  rl.close();
});

console.log(chalk.cyan('Enter a file or folder name (or press Enter to exit):'));
const cursorAnimation = animateCursor();

rl.on('SIGINT', () => {
  clearInterval(cursorAnimation);
  console.log(chalk.red('\nProgram terminated.'));
  rl.close();
});

rl.on('line', () => {
  clearInterval(cursorAnimation);
});

rl.on('keypress', (_, key) => {
  if (key.name !== 'up' && key.name !== 'down') {
    updateSuggestions();
  }
});