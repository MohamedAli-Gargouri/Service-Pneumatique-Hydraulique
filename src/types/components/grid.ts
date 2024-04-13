/**
 *
 *
 * @export
 * @class Grid
 */
export class Grid {
  id: number;
  dataField: string = 'id';
  gridTitle: string = 'List';
  gridTitleDescription: string = '';
  noDataMessage: string = 'No Data found.';
  onSelectionChangeCallBackMethod: Function = this.onSelectionChangeDefaultMethod;
  onSelectionChangeDefaultMethod() {
    // Default method, override this.
  }
}

/**
 *
 *
 * @export
 * @class GridBuilder
 */
export class GridBuilder {
  private grid: Grid;
  constructor() {
    this.grid = new Grid();
  }
  /**
   *
   *
   * @param {number} id
   * @return {*}
   * @memberof GridBuilder
   */
  setId(id: number) {
    this.grid.id = id;
    return this;
  }
  /**
   *
   *
   * @param {Function} onSelectionChangeCallBackMethod
   * @return {*}
   * @memberof GridBuilder
   */
  setOnSelectionChangeCallBackMethod(onSelectionChangeCallBackMethod: Function) {
    this.grid.onSelectionChangeCallBackMethod = onSelectionChangeCallBackMethod;
    return this;
  }
  setGridTitle(gridTitle: string) {
    this.grid.gridTitle = gridTitle;
    return this;
  }
  setGridTitleDescription(gridTitleDescription: string) {
    this.grid.gridTitleDescription = gridTitleDescription;
    return this;
  }
  setDataField(datafield: string) {
    this.grid.dataField = datafield;
    return this;
  }
  setNoDataMessage(noDataMessage: string) {
    this.grid.noDataMessage = noDataMessage;
    return this;
  }
  build() {
    return this.grid;
  }
}
