const path = require("path");

const Logger = {
  log: {
    info: (message) => {
      console.info(colorize.green(message));
    },
    warn: (message) => {
      console.warn(colorize.yellow(message));
    },
    error: (error) => {
      console.error(colorize.red(error.message));
    },
    exception: (error) => {
      console.error(colorize.red(error.message), colorize.blue(error.stack));
    },
  },
};

const colorize = {
  green: (message) => `\x1b[92m${message}\x1b[0m`,
  yellow: (message) => `\x1b[93m${message}\x1b[0m`,
  red: (message) => `\x1b[91m${message}\x1b[0m`,
  blue: (stack) => {
    const relativeStack = getRelativeStack(stack);
    return `\nStack trace: >>>>>>>>>>\n\t\x1b[94m${relativeStack}\x1b[0m\n<<<<<<<<<<`;
  },
};

const getRelativeStack = (stack) => {
  const cwd = process.cwd();
  const lines = stack.split("\n");
  const relativeLines = lines.map((line) => {
    const match = line.match(/\((.*):\d+:\d+\)/);
    if (match) {
      const absolutePath = match[1];
      const relativePath = path.relative(cwd, absolutePath);
      return line.replace(absolutePath, relativePath);
    }
    return line;
  });
  return relativeLines.join("\n\t");
};

module.exports = Logger;
