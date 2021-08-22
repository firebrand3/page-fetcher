const request = require("request");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let args = process.argv.slice(2);

// console.log(args);

request(args[0], (error, response, body) => {
  if (error) {
    console.log(`${args[0]} NOT FOUND`);
    rl.close();
    return;
  }
  if (args[1]) {
    rl.question("File already exists, Overwrite (y/n)? ", (answer) => {
      if (answer === "y") {
        fs.writeFile(args[1], body, function(err) {
          if (err) throw err;
          fs.stat(args[1], (err, stats) => {
            console.log(
              `Downloaded and saved ${stats.size} bytes to ${args[1]}`
            );
            rl.close();
            return;
          });
        });
      } else if (answer === "n") {
        console.log("Nothing downloaded");
        rl.close();
        return;
      } else if (answer !== "y" || answer !== "n") {
        console.log("Wrong input - try again - exiting app now");
        rl.close();
        return;
      }
      rl.close();
    });
  }
});
