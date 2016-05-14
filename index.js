function isValidCh(ch) {
  if (typeof ch !== 'string') {
    throw `Invalid type: ${typeof ch}`;
  }
  if (ch.length !== 1) {
    throw `"${ch}" is not exactly one character`;
  }
  if (/[1-9\s]/.test(ch)) {
    return true;
  } else {
    throw `Invalid character: "${ch}"`;
  }
}

class Checker {
  constructor() {
    this.values = [];
  }

  alreadyHaveCh(ch) {
    return this.values.some( v => v === ch);
  }

  add(ch) {
    isValidCh(ch);
    if (ch !== ' ' && this.alreadyHaveCh(ch)) {
      throw `"${ch}" already exists`;
    }
    this.values.push(ch);
  }

  hasAllDigits() {
    throw 'not implemented';
  }

  whatIsMissing() {
    throw 'not implemented 2';
  }
}

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

  findFirstEmptyCell() {
    throw 'Not implementadeoppp'
  }

  isAllFull() {
    throw 'not implemented either'
  }

  toString() {
    var ret = [];
    for (let y = 0;y < 9; y++) {
        ret.push(this.cells[y].join(' '));
    }
    return ret.join('\n');
  }

  setCells(...rows) {
    if (rows.length !== 9) {
      throw 'Expecting exactly 9 rows';
    }
    for (let r = 0; r < 9; r++) {
      let row = rows[r];
      if (typeof row !== 'string') {
        throw `Invalid row type ${typeof row}`;
      }
      if (row.length !== 9) {
        throw `"${row}" row must have exactly 9 characters`;
      }
      for (let x = 0; x < 9; x++) {
        let ch = row.charAt(x);
        if (isValidCh(ch)) {
          this.cells[r][x] = ch;
        }
      }
    }
  }

  from(anotherBoard) {
    throw 'Not impl'
  }

  checkRows() {
    for (let r = 0; r < 9; r++) {
      var checker = new Checker;
      for (let x = 0; x < 9; x++) {
        checker.add(this.cells[r][x]);
      }
    }
    return true;
  }

  checkColumns() {
    for (let x = 0; x < 9; x++) {
      var checker = new Checker;
      for (let r = 0; r < 9; r++) {
        checker.add(this.cells[r][x]);
      }
    }
  }

  checkLines() {
    return this.checkRows() && this.checkColumns();
  }

  checkHouse(x, y) {
    var checker = new Checker;
    for (var xx = 0; xx < 3; xx++) {
      for (var yy = 0; yy < 3; yy++) {
        checker.add(this.cells[y + yy][x + xx]);
      }
    }
    return true;
  }

  checkHouses() {
    for (x = 0; x < 9; x+=3) {
      for (y = 0; y < 9; y +=3) {
        checkHouse(x, y);
      }
    }
  }

  check() {
    return this.checkLines() && this.checkHouses();
  }
}

var b = new Board;
console.log(b.checkLines());
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
