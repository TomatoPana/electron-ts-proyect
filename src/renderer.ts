import Node from "./Node.js";
import Graph from "./Graph.js";

const drawArea = document.getElementById("drawArea");
const calcularArbol = document.getElementById("calcularArbol");
const reiniciarGrafo = document.getElementById("reiniciarGrafo");
const limpiar = document.getElementById("limpiar");

let selected: HTMLElement | null = null;

const mainGraph = new Graph();
const spanningTree = new Graph(); // Usar Grafo como Arbol para el calculo del resultado.

let emittedByNode = false;
let nodeId = 1;

function connectNodes(origin: HTMLDivElement, target: HTMLDivElement) {
  // TODO: Verificar si la conexión ya se hizo, y si se hizo, abortar.
  if (origin === target) return; // No conectar el mismo punto

  if (
    mainGraph.areAdjacents(
      Number.parseInt(origin.dataset.identifier),
      Number.parseInt(target.dataset.identifier)
    )
  )
    return;

  const x1 = origin.offsetLeft + 15;
  const y1 = origin.offsetTop + 15;
  const x2 = target.offsetLeft + 15;
  const y2 = target.offsetTop + 15;
  const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  const thickness = 5;
  const cx = (x1 + x2) / 2 - length / 2;
  const cy = (y1 + y2) / 2 - thickness / 2;
  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

  const newLine = document.createElement("div");
  newLine.classList.add("line");
  newLine.style.left = `${cx}px`;
  newLine.style.top = `${cy}px`;
  newLine.style.width = `${length}px`;
  newLine.style.transform = `rotate(${angle}deg)`;

  const valueField = document.createElement("input");
  valueField.classList.add("field");
  valueField.style.left = `${(x1 + x2) / 2 - 10}px`;
  valueField.style.top = `${(y1 + y2) / 2 - 10}px`;
  valueField.style.width = "20px";
  valueField.onclick = (e) => {
    e.stopPropagation();
    if (selected !== null) {
      selected.style.borderWidth = "1px";
      selected = null;
      return;
    }
  };

  valueField.onkeyup = (e) => {
    if (e.code === "Escape") {
      // El usuario quiere perder el foco del elemento. Restaurar el dato previamente guardado y salir
      (e.target as HTMLInputElement).blur();
      return;
    }
    const value = (e.target as HTMLInputElement).value;
  };

  drawArea.appendChild(newLine);
  drawArea.appendChild(valueField);
  mainGraph.addEdge(
    Number.parseInt(origin.dataset.identifier), 
    Number.parseInt(target.dataset.identifier), 
    1
  );
}

drawArea.addEventListener("click", (event: MouseEvent) => {
  if (emittedByNode) {
    // Se dio click en un nodo y no en el area, abortar
    emittedByNode = false;
    return;
  }
  if (selected !== null) {
    selected.style.borderWidth = "1px";
    selected = null;
    return;
  }

  const element = document.createElement("div");
  element.style.left = (event.clientX - 15).toString() + "px";
  element.style.top = (event.clientY - 127).toString() + "px";
  element.classList.add("node");
  element.innerText = nodeId.toString();
  element.dataset.identifier = nodeId.toString();
  const node = new Node(nodeId);
  nodeId++;

  let newPosX = 0,
    newPosY = 0,
    startPosX = 0,
    startPosY = 0;
  function mouseMove(event: MouseEvent) {
    console.count("mouseMove");
    // calculate the new position
    newPosX = startPosX - event.clientX;
    newPosY = startPosY - event.clientY;

    // with each move we also want to update the start X and Y
    startPosX = event.clientX;
    startPosY = event.clientY;

    // set the element's new position:
    element.style.top = element.offsetTop - newPosY + "px";
    element.style.left = element.offsetLeft - newPosX + "px";

    // Iterar por todas las conexiones que tenga el elemento para poder actualizar los componentes
    const node = mainGraph.getNode(Number.parseInt(element.dataset.nodeId));
    const adjacents = node.getAdjacents();
    adjacents.forEach(adjacent => {
      
    });
  }
  element.addEventListener("mousedown", (event) => {
    emittedByNode = true;
    console.count("mouseDown");
    event.preventDefault();
    event.stopPropagation();
    if (selected !== null) {
      // Se crea una union entre los elementos
      selected.style.borderWidth = "1px";
      connectNodes(selected as HTMLDivElement, event.target as HTMLDivElement);
      selected = null;
    }
    element.style.borderWidth = "3px";
    selected = element;
    startPosX = event.clientX;
    startPosY = event.clientY;

    drawArea.onmousemove = mouseMove;
    mainGraph.addVertex(node);
  });

  drawArea.onmouseup = function (event) {
    event.stopPropagation();
    console.count("MouseUp");
    drawArea.onmousemove = null;
  };

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

calcularArbol.onclick = function () {
  //TODO: Calcular algoritmo y generar las dos listas, uniones validas y uniones para descartar
};

reiniciarGrafo.onclick = function () {
  //TODO: Reinicia el grafo a su estado anterior (Sin el árbol mínimo).
};

limpiar.onclick = () => {
  if (!confirm("Estas seguro de borrar el lienzo?")) return;
  drawArea.innerHTML = "";
};

export default {};
