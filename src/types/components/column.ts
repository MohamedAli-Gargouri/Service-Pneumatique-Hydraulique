export type ColumnDataType = 'string' | 'date' | 'number' | 'boolean';
export type ColumnType = 'NORMAL' | 'IMG';
export type ColumnAlignment = 'left' | 'right' | 'centered';
export type ColumnTemplate = 'DEFAULT' | 'HIGHLIGHT';
export class Column {
  public id: number;
  public dataField: string = '';
  public caption: string = '';
  public dataType: ColumnDataType = 'string'; // date, datetime, number,boolean, string, object
  public allowGrouping: boolean = false;
  public type: ColumnType = 'NORMAL'; // Either: IMG, NORMAL
  public alignment: ColumnAlignment = 'left'; // either left, right or centered
  public template: ColumnTemplate = 'DEFAULT'; // DEFAULT, HIGHLIGHT
  public templateData: any = ''; // This can be anything
  public allowSearch: boolean = true; // false or true
  public allowExporting: boolean = false; // false or true
  public allowFiltering: boolean = true; // false or true
  public allowHeaderFiltering: boolean = true; // false or true
  public width: string | number;
  public hidingPriority: number | 'auto' = 'auto';
}
/**
 *
 * Generic Class that represents a Column within a Datagrid
 * @export
 * @class ColumnBuilder
 */

export class ColumnBuilder {
  private column: Column;
  constructor() {
    this.column = new Column();
  }

  /**
   *
   * Sets the Hiding
   * @param {(number | 'auto')} hidingPriority
   * @return {*}
   * @memberof ColumnBuilder
   */
  setHidingPriority(hidingPriority: number | 'auto'): any {
    this.column.hidingPriority = hidingPriority;
    return this;
  }
  /**
   *
   *
   * @param {ColumnTemplate} template
   * @return {*}
   * @memberof ColumnBuilder
   */
  setTemplate(template: ColumnTemplate): any {
    this.column.template = template;
    return this;
  }
  /**
   *
   *
   * @param {(string | number)} width
   * @return {*}
   * @memberof ColumnBuilder
   */
  setWidth(width: string | number): any {
    this.column.width = width;
    return this;
  }
  /**
   *
   *
   * @param {*} templateData
   * @return {*}
   * @memberof ColumnBuilder
   */
  setTemplateData(templateData: any): any {
    this.column.templateData = templateData;
    return this;
  }
  /**
   *
   *
   * @param {boolean} allowSearch
   * @return {*}
   * @memberof ColumnBuilder
   */
  setallowSearch(allowSearch: boolean): any {
    this.column.allowSearch = allowSearch;
    return this;
  }
  /**
   *
   *
   * @param {boolean} allowExporting
   * @return {*}
   * @memberof ColumnBuilder
   */
  setAllowExporting(allowExporting: boolean): any {
    this.column.allowExporting = allowExporting;
    return this;
  }
  /**
   *
   *
   * @param {boolean} allowFiltering
   * @return {*}
   * @memberof ColumnBuilder
   */
  setAllowFiltering(allowFiltering: boolean): any {
    this.column.allowFiltering = allowFiltering;
    return this;
  }

  /**
   *
   *
   * @param {boolean} allowHeaderFiltering
   * @return {*}
   * @memberof ColumnBuilder
   */
  setAllowHeaderFiltering(allowHeaderFiltering: boolean): any {
    this.column.allowHeaderFiltering = allowHeaderFiltering;
    return this;
  }
  /**
   *
   *
   * @param {number} id
   * @return {*}
   * @memberof ColumnBuilder
   */
  setId(id: number): any {
    this.column.id = id;
    return this;
  }
  /**
   *
   *
   * @param {ColumnAlignment} alignment
   * @return {*}
   * @memberof ColumnBuilder
   */
  setAlignment(alignment: ColumnAlignment): any {
    this.column.alignment = alignment;
    return this;
  }
  /**
   *
   *
   * @param {string} dataField
   * @return {*}
   * @memberof ColumnBuilder
   */
  setDataField(dataField: string): any {
    this.column.dataField = dataField;
    return this;
  }
  /**
   *
   *
   * @param {string} caption
   * @return {*}
   * @memberof ColumnBuilder
   */
  setCaption(caption: string): any {
    this.column.caption = caption;
    return this;
  }

  /**
   *
   *
   * @param {ColumnDataType} dataType
   * @return {*}
   * @memberof ColumnBuilder
   */
  setDataType(dataType: ColumnDataType): any {
    this.column.dataType = dataType;
    return this;
  }

  /**
   *
   *
   * @param {ColumnType} Type
   * @return {*}
   * @memberof ColumnBuilder
   */
  setType(Type: ColumnType): any {
    this.column.type = Type;
    return this;
  }

  /**
   *
   *
   * @param {boolean} allowGrouping
   * @return {*}
   * @memberof ColumnBuilder
   */
  setAllowGrouping(allowGrouping: boolean): any {
    this.column.allowGrouping = allowGrouping;
    return this;
  }
  /**
   *
   *
   * @return {*}
   * @memberof ColumnBuilder
   */
  build(): any {
    return this.column;
  }
}
