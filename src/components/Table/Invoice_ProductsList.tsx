import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import Product_1 from '../../assets/images/products/product_1.webp';
import QuantityInput from '../Input/Quantity/Invoice';
import React from 'react';
import { CardHeader, Input, Typography, CardBody, CardFooter, Avatar, Checkbox } from '@material-tailwind/react';
import Pagination from '../../utils/Table/Pagination';
import SortData from '../../utils/Table/SortRows';
import SearchRow from '../../utils/Table/Search';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
Invoice_ProductsList_Table.propTypes = {
  P_Selected: PropTypes.object.isRequired,
  P_Quantities: PropTypes.object.isRequired,
  P_Products: PropTypes.object.isRequired,
};
export default function Invoice_ProductsList_Table({ P_Selected, P_Quantities, P_Products }) {
  const { t } = useTranslation();
  const TABLE_HEAD = [
    { label: '', value: '' },
    {
      label: t('UCP.InvoiceProductList.TabHeader.ProductCode'),
      value: 'Product Code',
    },
    {
      label: t('UCP.InvoiceProductList.TabHeader.Product'),
      value: 'Product',
    },
    {
      label: t('UCP.InvoiceProductList.TabHeader.Price'),
      value: 'Price',
    },
    {
      label: t('UCP.InvoiceProductList.TabHeader.Quantity'),
      value: 'Quantity',
    },
  ];
  const TABLE_ROWS = [
    {
      ProductCode: 501,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 7050,
    },
    {
      ProductCode: 502,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 7005,
    },
    {
      ProductCode: 503,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 504,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 505,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 506,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 507,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 508,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 509,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 510,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 511,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 512,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 513,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 514,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 515,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 516,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 517,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
    {
      ProductCode: 518,
      img: Product_1,
      Brand: 'Hertz',
      Model: 'X478897 200ML X1',
      Price: 705,
    },
  ];

  const LightModeState = useSelector((state: RootState) => state.lightMode);

  const [AllData, SetAllData] = React.useState(TABLE_ROWS);
  const [VisibleData, SetVisibleData] = React.useState([]);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'dec'>('asc');
  const [currentPage, setCurrentPage] = React.useState(1);

  const [Quantities, setQuantities] = React.useState(
    TABLE_ROWS.map((item) => {
      return { ProductCode: item.ProductCode, Quantity: 1 };
    }),
  );
  const [Selected, SetSelected] = React.useState([]);

  const HandleSelectChange = (e, P_Code) => {
    if (e.target.checked) {
      // Add the item to the selected list
      SetSelected([...Selected, { ProductCode: P_Code }]);
    } else {
      // Remove the item from the selected list
      SetSelected(Selected.filter((item) => item.ProductCode !== P_Code));
    }
  };

  const VerifySelect = (PCode) => {
    return Selected.some((item) => item.ProductCode === PCode);
  };

  //==============These useeffects here help lift the state up to the upper component=============//
  React.useEffect(() => {
    P_Selected.current = Selected;
  }, [Selected]);

  React.useEffect(() => {
    P_Quantities.current = Quantities;
  }, [Quantities]);

  React.useEffect(() => {
    P_Products.current = TABLE_ROWS;
  }, []);

  return (
    <>
      <CardHeader
        floated={false}
        shadow={false}
        className={`rounded-none bg-transparent`}
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
              {t('UCP.InvoiceProductList.Title')}
            </Typography>
            <Typography
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {t('UCP.InvoiceProductList.Description')}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label={t('Global.Actions.Search')}
              onChange={(e) => {
                SearchRow(TABLE_ROWS, AllData, SetAllData, e);
              }}
              labelProps={{
                style: {
                  color: LightModeState === LightMode().type ? 'black' : 'white',
                },
              }}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody
        className="overflow-scroll px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
            {VisibleData.map(({ ProductCode, img, Brand, Model, Price }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={ProductCode}>
                  <td className={classes}>
                    {
                      <Checkbox
                        defaultChecked={VerifySelect(ProductCode)}
                        onClick={(e) => {
                          HandleSelectChange(e, ProductCode);
                        }}
                        ripple={false}
                        className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                      />
                    }
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
                        {Price}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <QuantityInput
                      QuantityLabel={'Quantity'}
                      IdLabel={'ProductCode'}
                      Id={ProductCode}
                      Quantities={Quantities}
                      setQuantities={setQuantities}
                    />
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
          AllData={AllData}
          VisibleData={VisibleData}
          SetVisibleData={SetVisibleData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </CardFooter>
    </>
  );
}
