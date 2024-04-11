export default function FilterData(
  ColumnName: string,
  FilterValue: any,
  TABLE_ROWS: Array<any>,
  SetAllData: Function,
  currentPage: any,
) {
  if (FilterValue == 'All') {
    SetAllData(TABLE_ROWS);
  } else {
    const FilteredData = TABLE_ROWS.filter(function (obj) {
      return obj[ColumnName] === FilterValue;
    });
    SetAllData(FilteredData);
  }
}
