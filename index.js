class Checker {

  constructor() {
    this.values = [];
  }

  has(value) {
    return this.values.indexOf(value) !== -1;
  }

  add(cell) {
    this.addVal(cell.value);
  }
  
  addVal(val) {
    if (this.has(val)) {
      return false;
    }
    if (val !== 0) { 
      this.values.push(val);
    }
    return true;
  }

  hasAllDigits() {
    return this.has(1) && this.has(2) && this.has(3) &&
           this.has(4) && this.has(5) && this.has(6) &&
           this.has(7) && this.has(8) && this.has(9);
  }

  whatIsMissing() {
    var ret = [];
    if (!this.has(1)) ret.push(1);
    if (!this.has(2)) ret.push(2);
    if (!this.has(3)) ret.push(3);
    if (!this.has(4)) ret.push(4);
    if (!this.has(5)) ret.push(5);
    if (!this.has(6)) ret.push(6);
    if (!this.has(7)) ret.push(7);
    if (!this.has(8)) ret.push(8);
    if (!this.has(9)) ret.push(9);
    return ret;
  }
}

class Cell {

  constructor() {
    this._value = 0;
  }

  set value(v) {
    if (typeof v === 'number') {
      if (v < 0 || v > 9) {
        throw `Value out of range: ${v}`;
      } else {
        this._value = v;
      }
    } else if (typeof v === 'string') {
      this._value = this.fromString(v);
    } else {
      throw `Invalid type for setting a cell value: ${typeof v}. ${v}`;
    }
  }

  get value() {
    return this._value;
  }

  fromString(ch) {
    switch (ch) {
      case ' ': return 0;
      case '1': return 1;
      case '2': return 2;
      case '3': return 3;
      case '4': return 4;
      case '5': return 5;
      case '6': return 6;
      case '7': return 7;
      case '8': return 8;
      case '9': return 9;
      default: throw `Invalid character "${ch}"`;
    }
  }

  toString() {
    return this.value ? String(this.value) : '_';
  }
}

class Board {

  constructor() {
    this.cells = [];
    for (let r = 0;r < 9; r++) {
      let currentRow = [];
      for (let x = 0; x < 9; x++) {
        currentRow.push(new Cell);
      }
      this.cells.push(currentRow);
    }
  }

  forEveryCell(fn) {
    for (let x = 0; x < 9; x++) {
      for (let y = 0;y < 9; y++) {
        if (fn(this.cells[x][y], x, y) === true) {
          return;
        }
      }
    }
  }

  findFirstEmptyCell() {
    var ret;
    this.forEveryCell((cell, x, y) => {
      if (cell.value === 0) {
        ret = [x, y];
        return true;
      }
    });
    return ret;
  }

  isAllFull() {
    return !!this.findFirstEmptyCell();
  }

  toString() {
    var ret = '';
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        ret += this.cells[x][y].toString() + ' ';
      }
      ret += '\n';
    }
    return ret;
  }
  
  print() {
    console.log(this.toString());
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
        this.cells[x][r].value = row.charAt(x);
      }
    }
  }

  from(anotherBoard) {
    this.forEveryCell((cell, x, y) => this.cells[x][y].value = anotherBoard.cells[x][y].value);
  }

  checkRows() {
    for (let y = 0; y < 9; y++) {
      var checker = new Checker;
      for (let x = 0; x < 9; x++) {
        if (checker.add(this.cells[x][y])) {
          console.warn(`Row ${y} is not good`);
          return false;
        }
      }
    }
    return true;
  }

  checkColumns() {
    for (let x = 0; x < 9; x++) {
      var checker = new Checker;
      for (let y = 0; y < 9; y++) {
        if (checker.add(this.cells[x][y]) === false) {
          console.warn(`Column ${x} is not good`);
          return false;
        }
      }
    }
    return true;
  }

  checkLines() {
    return this.checkRows() && this.checkColumns();
  }

  checkHouse(x, y) {
    var checker = new Checker;
    for (var xx = 0; xx < 3; xx++) {
      for (var yy = 0; yy < 3; yy++) {
        if (checker.add(this.cells[x + xx][y + yy]) === 0) {
          return false;
        }
      }
    }
    return true;
  }

  checkHouses() {
    for (let x = 0; x < 9; x+=3) {
      for (let y = 0; y < 9; y +=3) {
        if (this.checkHouse(x, y) === false) {
          console.warn(`The house at ${x}, ${y} is faulty`);
          return false;
        }
      }
    }
    return true;
  }

  check() {
    return this.checkLines() && this.checkHouses();
  }
  
  solve() {
    var firstEmptyCellDim = this.findFirstEmptyCell();
    if (firstEmptyCellDim) {
      var newBoard = new Board;
      newBoard.from(this);
      var [x, y] = firstEmptyCellDim;
      newBoard.cells[x][y].value = 1;
      newBoard.print();
    } else {
      console.log('It is already solved');
    }
  }
}

var b = new Board;
console.log(b.check());
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
b.print();
b.solve();
