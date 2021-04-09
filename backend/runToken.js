const { spawn } = require('child_process');

const logOutput = (name) => (data) => console.log(`[${name}] ${data.toString()}`)

function run(query) {
  console.log(query);
    return new Promise((resolve, reject) => {
      const process = spawn('python3', ['tokens.py',query]);
  
      var out = []
      process.stdout.on(
        'data',
        (data) => {
          out = data.toString();
          logOutput('stdout')(data);
        }
      );
  
  
      const err = []
      process.stderr.on(
        'data',
        (data) => {
          err.push(data.toString());
          logOutput('stderr')(data);
        }
      );
  
      process.on('exit', (code, signal) => {
        logOutput('exit')(`${code} (${signal})`)
        resolve(out);
      });
    });
  }

module.exports = {run}