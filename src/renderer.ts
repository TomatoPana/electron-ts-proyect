const drawArea = document.getElementById("drawArea");

const nodes = [];

let selected: HTMLElement | null = null;

var number = 64;

drawArea.addEventListener("click", (event: MouseEvent) => {
  const element = document.createElement("div");
  console.log(event);
  element.style.left = (event.clientX - 15).toString() + "px";
  element.style.top = (event.clientY - 150).toString() + "px";
  element.style.borderRadius = "50%";
  element.style.border = "black solid 1px";
  element.style.width = "30px";
  element.style.height = "30px";
  element.style.position = "absolute";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";
  element.style.display = "flex";
  element.style.zIndex = "2";
  element.style.background = "#ccc";
  element.style.userSelect = "none";
  element.innerText = "A";
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    if (selected !== null) {
      // Se crea una union entre los elementos
      selected.style.borderWidth = "1px";
      selected = null;
    }
    element.style.borderWidth = "3px";
    selected = element;
  });

  drawArea.appendChild(element);
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "Escape":
      event.preventDefault();
      if (selected !== null) {
        selected.style.borderWidth = "1px";
        selected = null;
      }
      break;
    case "Delete":
      event.preventDefault();
      if (selected !== null) {
        drawArea.removeChild(selected);
        selected = null;
      }
      break;
  }
});
