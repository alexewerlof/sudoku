class Board {
  constructor() {
    this.cells = [];
    for (let r = 0;r < 9; r++) {
      let currentRow = [];
      this.cells.push(currentRow);
      for (let x = 0; x < 9; x++) {
        currentRow[x] = '.';
      }
    }
  }

  toString() {
    var ret = '';
    for (let y = 0;y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        ret += this.cells[y][x] + ' ';
      }
      ret += '\n';
    }
    return ret;
  }
}

var b = new Board;
console.log(b.toString());
