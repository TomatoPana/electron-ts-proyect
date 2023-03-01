const drawArea = document.getElementById("drawArea");

const nodes = [];

let selected: HTMLElement | null = null;

var number = 64;

drawArea.addEventListener("click", (event: MouseEvent) => {
  if (selected !== null) {
    selected.style.borderWidth = "1px";
    selected = null;
    return;
  }
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

  let newPosX = 0,
    newPosY = 0,
    startPosX = 0,
    startPosY = 0;
  function mouseMove(event: MouseEvent) {
    // calculate the new position
    newPosX = startPosX - event.clientX;
    newPosY = startPosY - event.clientY;

    // with each move we also want to update the start X and Y
    startPosX = event.clientX;
    startPosY = event.clientY;

    // set the element's new position:
    element.style.top = element.offsetTop - newPosY + "px";
    element.style.left = element.offsetLeft - newPosX + "px";
  }
  element.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (selected !== null) {
      // Se crea una union entre los elementos
      selected.style.borderWidth = "1px";
      selected = null;
    }
    element.style.borderWidth = "3px";
    selected = element;
    startPosX = event.clientX;
    startPosY = event.clientY;

    document.addEventListener("mousemove", mouseMove);

    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", mouseMove);
    });
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
