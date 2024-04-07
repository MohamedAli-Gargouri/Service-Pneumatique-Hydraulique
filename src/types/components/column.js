export class Column {
  id;
  dataField = '';
  caption = '';
  dataType = 'string'; // date, datetime, number,boolean, string, object
  allowGrouping = false;
  type = 'NORMAL'; // Either: IMG, NORMAL
  alignment = 'left'; // either left, right or centered
  template = 'DEFAULT'; // DEFAULT, HIGHLIGHT
  templateData = ''; // This can be anything
  allowSearch = true; // false or true
  allowExporting = false; // false or true
  allowFiltering = true; // false or true
  allowHeaderFiltering = true; // false or true
  width;
  height;
  hidingPriority = 'auto';
}
export class ColumnBuilder {
  #column;
  constructor() {
    this.#column = new Column();
  }

  setHidingPriority(hidingPriority) {
    this.#column.hidingPriority = hidingPriority;
    return this;
  }
  setHeight(height) {
    this.#column.height = height;
    return this;
  }
  setTemplate(template) {
    this.#column.template = template;
    return this;
  }
  setWidth(width) {
    this.#column.width = width;
    return this;
  }
  setTemplateData(templateData) {
    this.#column.templateData = templateData;
    return this;
  }
  setallowSearch(allowSearch) {
    this.#column.allowSearch = allowSearch;
    return this;
  }
  setAllowExporting(allowExporting) {
    this.#column.allowExporting = allowExporting;
    return this;
  }
  setAllowFiltering(allowFiltering) {
    this.#column.allowFiltering = allowFiltering;
    return this;
  }

  setAllowHeaderFiltering(allowHeaderFiltering) {
    this.#column.allowHeaderFiltering = allowHeaderFiltering;
    return this;
  }
  setId(id) {
    this.#column.id = id;
    return this;
  }
  setAlignment(alignment) {
    this.#column.alignment = alignment;
    return this;
  }
  setDataField(dataField) {
    this.#column.dataField = dataField;
    return this;
  }
  setCaption(caption) {
    this.#column.caption = caption;
    return this;
  }
  /**
   *
   * @param {*} dataType  date, datetime, number,boolean, string, object
   * @returns
   */
  setDataType(dataType) {
    this.#column.dataType = dataType;
    return this;
  }
  /**
   *
   * @param { IMG | NORMAL} Type IMG for image, NORMAL FOR DATES, TEXT,  NUMBER AND OTHERS.
   * @returns
   */
  setType(Type) {
    this.#column.type = Type;
    return this;
  }
  /**
   *
   * @param {{src:"",alt:""}} img
   * @returns
   */
  setAllowGrouping(allowGrouping) {
    this.#column.allowGrouping = allowGrouping;
    return this;
  }
  build() {
    return this.#column;
  }
}
