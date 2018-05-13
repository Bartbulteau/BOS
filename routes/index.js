module.exports = function (io) {
  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.sendFile("index.html");
  });


  io.on('connection', (socket) => {
    console.log('connected');
    socket.emit('ok');
    socket.on('cmd', (cmd) => {
      var output;
      if (cmd === "help") {
        output = "We don't have any help to give you right now...";
      }
      else {
        output = eval(cmd);
      }
      socket.emit('output', output);
    });
  });





  return router;
}


var I = {
  "HALT": 0,
  "PUSH": 1,
  "POP": 2,
  "ADD": 3,
  "SUB": 4,
  "MUL": 5,
  "DIV": 6,
  "DUP": 7,
  "PRINTI": 8,
  "PRINTC": 9
}

var program = [];


function eval(cmd) {
  var output = "";
  var instruction = cmd.split(' ');
  for (var i in instruction) {
    if (instruction[i] in I) {
      program.push(I[instruction[i]]);
    }

    else if (!isNaN(instruction[i])) {
      if (parseInt(instruction[i]) !== NaN) {
        program.push(parseInt(instruction[i]));
        output += "Value: " + instruction[i];
      }
    }

    else if (instruction[i] === "RUN") {
      var vm = new VM(program);
      program = [];
      return vm.run();
    }

    else {
      return "Invalid instruction: " + instruction[i];
    }
  }
  console.log(program);
  return output;
}


function VM(program) {
  this.stack = [];
  this.pc = 0;
  this.program = program;
  this.ram = [];
  this.running = true;
  this.output = "";

  this.run = function () {
    this.pc = 0;
    while (this.running) {
      switch (this.program[this.pc]) {
        case I["HALT"]:
          this.running = false;
          break;
        case I["PUSH"]:
          this.pc++;
          this.stack.push(this.program[this.pc]);
          break;
        case I["POP"]:
          this.stack.pop();
          break;
        case I["ADD"]:
          this.a = this.stack.pop();
          this.b = this.stack.pop();
          this.stack.push(this.a + this.b);
          break;
        case I["SUB"]:
          this.a = this.stack.pop();
          this.b = this.stack.pop();
          this.stack.push(this.a - this.b);
          break;
        case I["MUL"]:
          this.a = this.stack.pop();
          this.b = this.stack.pop();
          this.stack.push(this.a * this.b);
          break;
        case I["DIV"]:
          this.a = this.stack.pop();
          this.b = this.stack.pop();
          this.stack.push(this.a / this.b);
          break;
        case I["PRINTI"]:
          this.output += this.stack.pop();
          this.output += "\n";
          break;
        default:
          running = false;
          this.output = "Fatal error invalid instruction: " + this.program[this.pc];
          break;
      }
      this.pc++;
    }
    return this.output;
  }
}