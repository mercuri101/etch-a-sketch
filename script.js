const body = document.querySelector("body");
const field = document.querySelector(".field");

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