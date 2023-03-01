// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

const drawArea = document.getElementById("drawArea");

const nodes = [];

let selected: HTMLElement | null = null;

drawArea.addEventListener("click", (event) => {
  const element = document.createElement("div");
  console.log("Left: %d", (event.clientX - 15).toString());
  console.log("Top: %d", (event.clientY - 115).toString());
  element.style.left = (event.clientX - 15).toString() + "px";
  element.style.top = (event.clientY - 115).toString() + "px";
  element.style.borderRadius = "50%";
  element.style.border = "black solid 1px";
  element.style.width = "30px";
  element.style.height = "30px";
  element.style.position = "absolute";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";
  element.style.display = "flex";
  element.style.zIndex = "2";
  element.innerText = "A";
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    if (selected !== null) {
      // Se crea una union entre los elementos
      selected.style.borderWidth = "1px";
    }
    element.style.borderWidth = "3px";
    selected = element;
  });

  drawArea.appendChild(element);
});
