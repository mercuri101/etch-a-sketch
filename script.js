const body = document.querySelector("body");
const field = document.querySelector(".field");
const newGrindButton = document.querySelector(".new-grid-btn");
const colors = document.querySelectorAll(".color");
const drawerBtn = document.querySelector(".drawer");
const eraserBtn = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");

let curColor = "black";

const emptyCellBorder = "1px solid rgba(80, 80, 80, 0.2)";
const emptyCellColor = "whitesmoke";

createGrid(16);
setupColorPalette(colors);

newGrindButton.addEventListener("click", () => createNewGrid());
drawerBtn.addEventListener("click", () => setDrawingMode(curColor));
eraserBtn.addEventListener("click", () => setErasingMode());
clearBtn.addEventListener("click", () => clearField());
colors.forEach(color => color.addEventListener("click", () => setCurColor(color)));


function createGrid(size) {
  for (row = 0; row < size; row++) {
    let newRow = document.createElement("div");
    newRow.classList.add("row");

    for (col = 0; col < size; col++) {
      let newCell = document.createElement("div");
      newCell.classList.add("cell");
      newCell.style.border = emptyCellBorder;
      newCell.style.backgroundColor = emptyCellColor;
      newRow.appendChild(newCell);
    }
    field.appendChild(newRow);
  }

  setDrawingMode(curColor);
}


function createNewGrid() {
  let size;

  // Keep prompting for a size between 0 and 101
  do {
    size = prompt("Enter size of the new grid (up to 100):");
  } while (size <= 0 || size > 100);

  let rowsToDelete = document.querySelectorAll(".row");
  rowsToDelete.forEach(row => row.remove());

  createGrid(size);
}


function setDrawingMode(color) {
  drawerBtn.classList.add("active");
  drawerBtn.classList.remove("inactive-hover");
  eraserBtn.classList.remove("active");
  eraserBtn.classList.add("inactive-hover");

  let mouseIsDown = false;

  field.addEventListener("mousedown", () => mouseIsDown = true);
  field.addEventListener("mouseup", () => mouseIsDown = false);

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.addEventListener("mouseover", () => mouseIsDown ? colorCell(cell, color) : undefined));
  cells.forEach(cell => cell.addEventListener("mousedown", () => colorCell(cell, color)));
}


function setErasingMode() {
  eraserBtn.classList.add("active");
  eraserBtn.classList.remove("inactive-hover");
  drawerBtn.classList.remove("active");
  drawerBtn.classList.add("inactive-hover");

  let mouseIsDown = false;

  field.addEventListener("mousedown", () => mouseIsDown = true);
  field.addEventListener("mouseup", () => mouseIsDown = false);

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.addEventListener("mouseover", () => mouseIsDown ? eraseCell(cell) : undefined));
  cells.forEach(cell => cell.addEventListener("mousedown", () => eraseCell(cell)));
}


function clearField() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach(cell => eraseCell(cell));
}


function setupColorPalette(colors) {
  colors.forEach(color => color.style.backgroundColor = color.getAttribute("data-color"));
}


function setCurColor(color) {
  let oldColor = document.querySelector(`.color[data-color=${curColor}]`);

  oldColor.classList.remove("active");
  oldColor.classList.add("inactive-hover");

  curColor = color.getAttribute("data-color");
  color.classList.add("active");
  color.classList.remove("inactive-hover");

  setDrawingMode(curColor);
}


function colorCell(cell, color) {
  cell.style.backgroundColor = color;
  cell.style.border = `1px solid ${color}`;
}

function eraseCell(cell) {
  cell.style.backgroundColor = emptyCellColor;
  cell.style.border = emptyCellBorder;
}