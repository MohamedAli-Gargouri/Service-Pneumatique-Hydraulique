import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
export interface PaginationParam {
  currentPage: number;
  setCurrentPage: Function;
  totalPages: number;
}
export function Pagination(param: PaginationParam) {
  const { t } = useTranslation();

  const next = () => {
    if (param.currentPage === param.totalPages) return;

    param.setCurrentPage(param.currentPage + 1);
  };

  const prev = () => {
    if (param.currentPage === 1) return;

    param.setCurrentPage(param.currentPage - 1);
  };

  return (
    <div className=" w-full flex justify-center items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={param.currentPage === 0}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        {t('Table.Actions.Previous')}
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: param.totalPages }, (_, index) => (
          <IconButton
            className="rounded-full"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            key={'Pagination' + index}
            variant={param.currentPage === index ? 'filled' : 'text'}
            color="red"
            onClick={() => param.setCurrentPage(index)}
            placeholder={undefined}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={param.currentPage === param.totalPages - 1}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {t('Table.Actions.Next')}
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;
