import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ConfirmDeleteDialog from '../Dialog/Confirm';
import InvoiceProductDialog from '../Dialog/InvoiceProduct';
import React from 'react';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';

Invoice_SelectedProducts_Table.propTypes = {
  ProductsData: PropTypes.array.isRequired,
  SetProductsData: PropTypes.func.isRequired,
};
export default function Invoice_SelectedProducts_Table({ ProductsData, SetProductsData }) {
  const { t } = useTranslation();
  const TABLE_HEAD = [
    {
      label: t('UCP.InvoiceSelectedProductsTable.TabHeader.ProductCode'),
      value: 'Product Code',
    },
    {
      label: t('UCP.InvoiceSelectedProductsTable.TabHeader.Product'),
      value: 'Product',
    },
    {
      label: t('UCP.InvoiceSelectedProductsTable.TabHeader.Price'),
      value: 'Unit Price',
    },
    {
      label: t('UCP.InvoiceSelectedProductsTable.TabHeader.Quantity'),
      value: 'Quantity',
    },
    {
      label: t('UCP.InvoiceSelectedProductsTable.TabHeader.Total'),
      value: 'Total',
    },
    { label: '', value: '' },
  ];
  const [OpenInvoiceAddProduct, SetOpenInvoiceAddProduct] = React.useState(false);
  const [OpenDeleteDialog, SetOpenDeleteDialog] = React.useState(false);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'dec'>('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = React.useState(1); // 'asc' or 'desc'

  const SelectedRow = React.useRef(null);

  const HandleDeleteRow = (id) => {
    const newData = ProductsData.filter((item) => item.ProductCode !== id);
    SetProductsData(newData);
  };
  return (
    <Card
      className={`w-full  h-full  shadow-none bg-inherit `}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none bg-transparent `}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.InvoiceSelectedProductsTable.Title')}
            </Typography>
            <Typography
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.InvoiceSelectedProductsTable.Description')}
            </Typography>
          </div>

          <Button
            className="flex items-center gap-1 md:gap-3"
            size="sm"
            onClick={() => {
              SetOpenInvoiceAddProduct(true);
            }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-plus"></i> {t('UCP.InvoiceSelectedProductsTable.TabActions.Add')}
          </Button>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-scroll px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="mt-0 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  onClick={() => {
                    if (index !== TABLE_HEAD.length - 1)
                      SortData(head.value, sortDirection, setSortDirection, VisibleData, SetVisibleData, 'Products');
                  }}
                  key={head.value}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {head.label}{' '}
                    {index !== TABLE_HEAD.length - 1 && <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VisibleData.map(({ ProductCode, img, Brand, Model, Price, Quantity }, index) => {
              const isLast = index === ProductsData.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={ProductCode}>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        #{ProductCode}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={img}
                        alt={Brand}
                        size="sm"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {Brand}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal opacity-70"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {Model}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {Price} TND
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {Quantity}x
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {Quantity * Price} TND
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Tooltip content="Delete Product">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          SelectedRow.current = ProductCode;
                          SetOpenDeleteDialog(true);
                        }}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Pagination
          AllData={ProductsData}
          VisibleData={VisibleData}
          SetVisibleData={SetVisibleData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardFooter>
      <ConfirmDeleteDialog
        Open={OpenDeleteDialog}
        Action={() => {
          HandleDeleteRow(SelectedRow.current);
        }}
        HandleOpen={() => {
          SetOpenDeleteDialog(!OpenDeleteDialog);
        }}
        color="red"
        Icon={'<i className="fa-solid fa-trash h-5 w-5 mx-1"></i>'}
        Title={t('UCP.InvoiceProductList.TabHeader.Product')}
        Content={t('UCP.DialogMessages.Invoice.DeleteProduct_Confirm')}
      />
      <InvoiceProductDialog
        SetAllData={SetProductsData}
        Open={OpenInvoiceAddProduct}
        HandleOpen={() => {
          SetOpenInvoiceAddProduct(!OpenInvoiceAddProduct);
        }}
        Icon={'<i className="fa-solid fa-gear"></i>'}
        Title={'Add Product to Invoice'}
        Content=""
      />
    </Card>
  );
}
