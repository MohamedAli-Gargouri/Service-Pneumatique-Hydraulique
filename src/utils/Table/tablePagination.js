
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types"
import TranslatedText from '../../utils/Translation';
Pagination.propTypes={
  currentPage:PropTypes.number.isRequired,
  setCurrentPage:PropTypes.func.isRequired, 
  totalPages:PropTypes.number.isRequired,
}
export function Pagination({currentPage,setCurrentPage,totalPages}) {

  const getItemProps = (index) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "red",
      onClick: () => setCurrentPage(index),
      className: "rounded-full",
    } );
 
  const next = () => {
    if (currentPage === totalPages) return;
 
    setCurrentPage(currentPage + 1);
  };
 
  const prev = () => {
    if (currentPage === 1) return;
 
    setCurrentPage(currentPage - 1);
  };
 
  return (
    <div className=" w-full flex justify-center items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> <TranslatedText TranslationPath="Table.Actions.Previous" />
      </Button>
      <div className="flex items-center gap-2">
        {
          Array.from({ length: totalPages }, (_, index) => (
            <IconButton key={"Pagination"+index} {...getItemProps(index)}>{index+1}</IconButton>
          ))
        }
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={currentPage === totalPages-1}
      >
        <TranslatedText TranslationPath="Table.Actions.Next" />
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}


export default Pagination;
