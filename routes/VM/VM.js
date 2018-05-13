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


function VM(program) {
    this.stack = [];
    this.pc = 0;
    this.program = program;
    this.ram = [];
    this.running = true;
    this.output = "";

    this.run = function () {
        this.pc = 0;
        while (running) {
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
                    this.stack.push(this.a + this.b)
                    break;
                case I["PRINTI"]:
                    this.output += this.stack.pop();
                    this.output += "\n";
                    break;
            }
            this.pc++;
        }
        return this.output;
    }
}