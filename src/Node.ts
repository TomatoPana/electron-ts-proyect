/**
 * Representa un Nodo del grafo ponderado no dirigido.
 *
 * Guarda en el su lista de Nodos adyacentes asi como los
 * valores de sus vertices.
 */
class Node {
  private _id: number;
  /**
   * Identificador único usado para referenciar el Nodo en el DOM
   */
  public get id() {
    return this._id;
  }

  /**
   * La clave hace referencia al ID del nodo al cual esta conectado,
   * mientras que el valor es el valor del nodo
   */
  private adjacentList: Map<number, number>;

  /**
   * @param id Identificador asociado en el DOM
   */

  constructor(id: number) {
    this._id = id;
    this.adjacentList = new Map();
  }

  /**
   * Añade una nueva conexión a este nodo
   *
   * @param id Identificador del Nodo a añadir
   * @param value Valor del vértice, valor por defecto 1.0
   */
  addAdjacent(id: number, value = 1.0) {
    // El elemento ha sido previamente añadido, abortar
    if (this.adjacentList.has(id)) return;

    this.adjacentList.set(id, value);
  }

  /**
   * 
   * @param id El ID del nodo a modificar su conexión
   * @param value El nuevo valor de la conexión
   */
  changeAdjacent(id: number, value: number) {
    // El elemento no existe, abortar
    if (!this.adjacentList.has(id)) return;

    this.adjacentList.set(id, value);
  }

  /**
   * Elimina la conexión con un nodo en particular
   * @param id El ID del nodo a eliminar
   * @returns `true` si se elimina, `false` de lo contrario
   */
  removeAdjacent(id: number) {
    return this.adjacentList.delete(id)
  }

  /**
   * Verifica si un nodo conecta a este nodo.
   * @param id El ID del nodo a buscar
   * @returns `true` si se encuentra, `false` de lo contrario
   */
  isAdjacent(id: number) {
    return this.adjacentList.has(id);
  }

  /**
   * Obtiene todos los IDs de los nodos adyacentes
   * @returns Un arreglo con todos los nodos adyacentes, o un arreglo vacío si no hay nodos adyacentes
   */
  getAdjacents() {
    return Array.from(this.adjacentList.keys());
  }
}

export default Node;
