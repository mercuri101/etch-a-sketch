const body = document.querySelector("body");
const field = document.querySelector(".field");


// Create 16x16 grid
for (row = 0; row < 16; row++) {
  let newRow = document.createElement("div");
  newRow.classList.add("row");

  for (col = 0; col < 16; col++) {
    let newCell = document.createElement("div");
    newCell.classList.add("cell");
    newRow.appendChild(newCell);
  }
  field.appendChild(newRow);
}

// Implement hover-coloring
const color = "blue";
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => cell.addEventListener("mouseover", () => colorCell(cell, color)));


function colorCell(cell, color) {
  cell.style.backgroundColor = color;
}