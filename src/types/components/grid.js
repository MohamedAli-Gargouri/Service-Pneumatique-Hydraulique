export class Grid {
  id;
  dataField = 'id';
  gridTitle = 'List';
  gridTitleDescription = '';
  noDataMessage = 'No Data found.';
  onSelectionChangeCallBackMethod = this.onSelectionChangeDefaultMethod;

  onSelectionChangeDefaultMethod() {
    // Default method, override this.
  }
}
export class GridBuilder {
  #grid;
  constructor() {
    this.#grid = new Grid();
  }
  setId(id) {
    this.#grid.id = id;
    return this;
  }
  setOnSelectionChangeCallBackMethod(onSelectionChangeCallBackMethod) {
    this.#grid.onSelectionChangeCallBackMethod =
      onSelectionChangeCallBackMethod;
    return this;
  }
  setGridTitle(gridTitle) {
    this.#grid.gridTitle = gridTitle;
    return this;
  }
  setGridTitleDescription(gridTitleDescription) {
    this.#grid.gridTitleDescription = gridTitleDescription;
    return this;
  }
  setDataField(datafield) {
    this.#grid.dataField = datafield;
    return this;
  }
  setNoDataMessage(noDataMessage) {
    this.#grid.noDataMessage = noDataMessage;
    return this;
  }
  build() {
    return this.#grid;
  }
}
