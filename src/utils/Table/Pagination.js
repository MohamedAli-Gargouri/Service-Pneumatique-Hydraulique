import React from 'react';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
function Pagination({AllData,VisibleData,SetVisibleData,currentPage,setCurrentPage}) {
    //Items per page
  const itemsPerPage = 2;
    // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the VisibleData array to display only the items for the current page
  const currentData = AllData.slice(startIndex, endIndex);
  // Calculate the total number of pages
  const [totalPages,SettotalPages] = React.useState(Math.ceil(AllData.length / itemsPerPage))
  React.useEffect(()=>{
    SetVisibleData(currentData) 
  },[currentPage])

  React.useEffect(()=>{
    setCurrentPage(1)
    SetVisibleData(currentData)
    SettotalPages(Math.ceil(AllData.length / itemsPerPage))
  },[AllData])


  const handleNextChange = () => {
    if(totalPages>=currentPage+1)
     {
      setCurrentPage(currentPage+1);
     }
    
  };
  const handlePreviousChange = () => {
    if(currentPage-1>=1)
     {
      setCurrentPage(currentPage-1);
     }
    
  };
  // Implement your pagination UI here

  return (
    <>
      <Typography variant="small"  className="font-normal">
            Page {currentPage} out of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" onClick={()=>{handlePreviousChange()}}>
              Previous
            </Button>
            <Button variant="outlined" size="sm" onClick={()=>{handleNextChange()}}>
              Next
            </Button>
          </div>
    </>
  );
}

export default Pagination;
