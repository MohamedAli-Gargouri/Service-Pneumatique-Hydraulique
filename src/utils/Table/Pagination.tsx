import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PaginationParam } from 'types/components/params';

/**
 *
 * @param param
 * @returns
 */
function Pagination(param: PaginationParam) {
  const { t } = useTranslation();
  const itemsPerPage = 10;
  const startIndex = (param.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = param.AllData.slice(startIndex, endIndex);
  const [totalPages, SettotalPages] = React.useState(Math.ceil(param.AllData.length / itemsPerPage));
  React.useEffect(() => {
    param.SetVisibleData(currentData);
  }, [param.currentPage]);

  React.useEffect(() => {
    param.setCurrentPage(1);
    param.SetVisibleData(currentData);
    SettotalPages(Math.ceil(param.AllData.length / itemsPerPage));
  }, [param.AllData]);

  const handleNextChange = () => {
    if (totalPages >= param.currentPage + 1) {
      param.setCurrentPage(param.currentPage + 1);
    }
  };
  const handlePreviousChange = () => {
    if (param.currentPage - 1 >= 1) {
      param.setCurrentPage(param.currentPage - 1);
    }
  };

  return (
    <>
      <Typography
        variant="small"
        className=" text-center font-normal"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {t('Table.Labels.Page.Part1') + param.currentPage}
        {t('Table.Labels.Page.Part2') + totalPages}
      </Typography>
      <div className="mt-4 text-center flex gap-2">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => {
            handlePreviousChange();
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {t('Table.Actions.Previous')}
        </Button>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => {
            handleNextChange();
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {t('Table.Actions.Next')}
        </Button>
      </div>
    </>
  );
}

export default Pagination;
