import readline from 'readline';
import chalk from 'chalk';

const commands = [
  { command: 'ls', description: 'List directory contents' },
  { command: 'cd', description: 'Change directory' },
  { command: 'mkdir', description: 'Make directory' },
  { command: 'rm', description: 'Remove files or directories' },
  { command: 'cp', description: 'Copy files or directories' },
  { command: 'mv', description: 'Move or rename files or directories' },
  { command: 'cat', description: 'Concatenate and print files' },
  { command: 'grep', description: 'Search for patterns in files' },
  { command: 'chmod', description: 'Change file permissions' },
  { command: 'ssh', description: 'Secure shell remote login' },
  { command: 'scp', description: 'Secure copy (remote file copy)' },
  { command: 'tar', description: 'Tape archiver for file compression' },
  { command: 'wget', description: 'Non-interactive network downloader' },
  { command: 'curl', description: 'Transfer data from or to a server' },
  { command: 'ping', description: 'Test network connectivity' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let buffer = '';
let suggestions = [];

function getSuggestions(input) {
  return commands.filter(cmd => 
    cmd.command.startsWith(input) || cmd.description.toLowerCase().includes(input.toLowerCase())
  );
}

function displayPrompt() {
  process.stdout.write('\x1b[2K\r');  // Clear the current line
  process.stdout.write(chalk.cyan('$ ') + buffer);
  if (suggestions.length > 0) {
    console.log('\n' + suggestions.map(s => `  ${chalk.green(s.command)}: ${s.description}`).join('\n'));
  }
}

rl.input.on('keypress', (_, key) => {
  if (key.name === 'return') {
    console.log('\nExecuting:', buffer);
    buffer = '';
    suggestions = [];
  } else if (key.name === 'backspace') {
    buffer = buffer.slice(0, -1);
  } else if (key.name === 'tab') {
    if (suggestions.length === 1) {
      buffer = suggestions[0].command;
    }
  } else if (key.sequence) {
    buffer += key.sequence;
  }

  if (buffer.length > 0) {
    suggestions = getSuggestions(buffer);
  } else {
    suggestions = [];
  }

  displayPrompt();
});

console.log(chalk.yellow('Command Suggester'));
console.log(chalk.green('Start typing a command or description, and suggestions will appear.'));
console.log(chalk.green('Press Tab to accept a unique suggestion, Enter to execute, or Ctrl+C to exit.'));
displayPrompt();

rl.on('SIGINT', () => {
  console.log(chalk.red('\nExiting Command Suggester'));
  process.exit();
});