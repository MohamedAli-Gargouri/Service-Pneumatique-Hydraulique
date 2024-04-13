export default function Search(TABLE_ROWS: Array<any>, AllData: Array<any>, SetAllData: Function, e: any) {
  const SearchedString = e.target.value;
  if (SearchedString === '') {
    SetAllData(TABLE_ROWS);
  } else {
    const FilteredData = TABLE_ROWS.filter(function (obj) {
      for (const key in obj) {
        if (obj[key].toString().toUpperCase().includes(SearchedString.toUpperCase())) return true;
      }
      return false;
    });

    SetAllData(FilteredData);
  }
}
