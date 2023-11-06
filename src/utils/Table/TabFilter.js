export default function FilterData(
  ColumnName,
  FilterValue,
  TABLE_ROWS,
  SetAllData,
  currentPage,
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
