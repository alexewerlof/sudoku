class Board {
  constructor() {
    this.cells = [];
    for (let r = 0;r < 9; r++) {
      let currentRow = [];
      this.cells.push(currentRow);
      for (let x = 0; x < 9; x++) {
        currentRow[x] = ' ';
      }
    }
  }

  toString() {
    var ret = [];
    for (let y = 0;y < 9; y++) {
        ret.push(this.cells[y].join(' '));
    }
    return ret.join('\n');
  }

  setCells(...rows) {
    for (let r = 0; r < 9; r++) {
      for (let x = 0; x < 9; x++) {
        this.cells[r][x] = rows[r].charAt(x);
      }
    }
  }
}

var b = new Board;
console.log(b.toString());
b.setCells(
  '    27  8',
  ' 3   826 ',
  ' 8  463 7',
  '6  28    ',
  '5  7  48 ',
  '2  7  48 ',
  '  5 7  4 ',
  '8 1  372 ',
  '  78546  '
)
console.log(b.toString());
