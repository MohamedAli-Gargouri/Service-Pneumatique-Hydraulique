
export default  function  Search (TABLE_ROWS,AllData,SetAllData,e) {

    const SearchedString=e.target.value
    if(SearchedString=="")
    {
        SetAllData(TABLE_ROWS)  
    }
    else
    {
        const FilteredData=AllData.filter(function(obj) {

            for (const key in obj) {
                if(obj[key].toUpperCase().includes(SearchedString.toUpperCase()))
                    return true;
              }
              return false    
          });

          SetAllData(FilteredData)
    }

   
    };