import Node from "./Node.js";
/**
 * Representa un grafo con nodos en su interior
 * Contiene métodos para agregar, eliminar y conectar Nodos.
 *
 * Asi mismo, para optimizar el grafo, contiene todos los vertices
 * del Grafo, sus valores asi como sus conexiones.
 */
class Graph {
  /**
   * Elementos que conforman el nodo, la clave es el identificador usado
   * para referenciar el Nodo en el DOM, el valor es el objeto en si.
   */
  protected nodes: Map<number, Node>;

  /**
   * Lista de todos los vertices del grafo, la clave es los identificadores
   * de los nodos ordenados de menor a mayor separado de un guion bajo, seguido
   * del valor del vértice.
   */
  protected edges: Map<string, number>;
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  /**
   * Añade un nodo al grafo, si el nodo ya existe, no se modifica el grafo
   * @param node El nodo a agregar
   */
  addVertex(node: Node) {
    // Si el nodo ya existe, abortar
    if (this.nodes.has(node.id)) return;

    this.nodes.set(node.id, node);
  }

  /**
   * Elimina un nodo del grafo
   * @param node El nodo a eliminar
   */
  removeVertex(node: number | Node) {
    const current = node instanceof Node ? node.id : node;
    if (!this.nodes.has(current)) return;

    // Si cuenta con conexiones con otros nodos, eliminar dichas conexiones.
    Array.from(this.nodes.values()).forEach((node) => {
      if (node.removeAdjacent(current)) {
        // Se eliminó la conexión, por ende, eliminar de la lista de vértices
        const key =
          node.id < current ? `${node.id}_${current}` : `${current}_${node.id}`;
        this.edges.delete(key);
      }
    });
  }

  addEdge(source: number | Node, destination: number | Node, value: number) {
    const sourceId = source instanceof Node ? source.id : source;
    const destinationId =
      destination instanceof Node ? destination.id : destination;

    const edgeKey =
      sourceId < destinationId
        ? `${sourceId}_${destinationId}`
        : `${destinationId}_${sourceId}`;

    // Si la conexión ya existe, abortar
    if (this.edges.has(edgeKey)) return;

    const sourceNode = this.nodes.get(sourceId);
    const destinationNode = this.nodes.get(destinationId);

    // Si el origen o el destino no existen, abortar
    if (sourceNode === undefined) return;
    if (destinationNode === undefined) return;

    sourceNode.addAdjacent(destinationId, value);
    destinationNode.addAdjacent(sourceId, value);

    this.edges.set(edgeKey, value);
  }

  removeEdge(source: number | Node, destination: number | Node) {
    const sourceId = source instanceof Node ? source.id : source;
    const destinationId =
      destination instanceof Node ? destination.id : destination;

    const edgeKey =
      sourceId < destinationId
        ? `${sourceId}_${destinationId}`
        : `${destinationId}_${sourceId}`;

    // Si la conexión no existe, abortar
    if (!this.edges.has(edgeKey)) return;

    const sourceNode = this.nodes.get(sourceId);
    const destinationNode = this.nodes.get(destinationId);

    // Si el origen o el destino no existen, abortar
    if (sourceNode === undefined) return;
    if (destinationNode === undefined) return;

    sourceNode.removeAdjacent(destinationId);
    destinationNode.removeAdjacent(sourceId);

    this.edges.delete(edgeKey);
  }

  areAdjacents(source: number | Node, destination: number | Node) {
    const sourceId = source instanceof Node ? source.id : source;
    const destinationId =
      destination instanceof Node ? destination.id : destination;

    const edgeKey =
      sourceId < destinationId
        ? `${sourceId}_${destinationId}`
        : `${destinationId}_${sourceId}`;

    // Si la conexión no existe, abortar
    return this.edges.has(edgeKey);
  }
}

export default Graph;
