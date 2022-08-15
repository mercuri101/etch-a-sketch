const body = document.querySelector("body");
const field = document.querySelector(".field");
const newGrindButton = document.querySelector(".new-grid-btn");
const colors = document.querySelectorAll(".color");

const curColor = "blue";

createGrid(16);
newGrindButton.addEventListener("click", () => createNewGrid());

setupColorPalette(colors);


function colorCell(cell, color) {
  cell.style.backgroundColor = color;
  cell.style.border = `1px solid ${color}`;
}


function createGrid(size) {
  for (row = 0; row < size; row++) {
    let newRow = document.createElement("div");
    newRow.classList.add("row");

    for (col = 0; col < size; col++) {
      let newCell = document.createElement("div");
      newCell.classList.add("cell");
      newRow.appendChild(newCell);
    }
    field.appendChild(newRow);
  }

  addHoverColoring(curColor);
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


function addHoverColoring(color) {
  let mouseIsDown = false;

  field.addEventListener("mousedown", () => mouseIsDown = true);
  field.addEventListener("mouseup", () => mouseIsDown = false);

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.addEventListener("mouseover", () => mouseIsDown ? colorCell(cell, color) : undefined));
  cells.forEach(cell => cell.addEventListener("mousedown", () => colorCell(cell, color)));
}


function setupColorPalette(colors) {
  colors.forEach(color => color.style.backgroundColor = color.getAttribute("data-color"));
}