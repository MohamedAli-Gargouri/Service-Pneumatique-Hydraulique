import React from 'react';

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import InvboxProductTable from '../Table/Invoice_ProductsList';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/LightActions';
import TranslatedText from '../../utils/Translation';
import { Notify } from '../../utils/Toast/toast';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
Invoice_ProductsDialog.propTypes = {
  SetAllData: PropTypes.func.isRequired,
  Open: PropTypes.bool.isRequired,
  HandleOpen: PropTypes.func.isRequired,
  Content: PropTypes.string,
  Icon: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
};
export default function Invoice_ProductsDialog({ SetAllData, Open, HandleOpen, Content, Icon, Title }) {
  const mdbreakpoint = 720;
  const LightModeState = useSelector((state) => state.lightMode);
  const P_Selected = React.useRef([]);
  const P_Quantities = React.useRef([]);
  const P_Products = React.useRef([]);

  const HandleAddProductToInvoice = () => {
    const selectedProducts = P_Selected.current;

    const selectedProductsQuantities = selectedProducts.map((selectedItem) => {
      const matchingQuantityInput = P_Quantities.current.find(
        (quantityInput) => quantityInput.ProductCode === selectedItem.ProductCode,
      );

      const matchingProductData = P_Products.current.find(
        (productData) => productData.ProductCode === selectedItem.ProductCode,
      );

      if (matchingQuantityInput && matchingProductData) {
        return {
          ...matchingProductData,
          Quantity: matchingQuantityInput.Quantity,
        };
      }

      return null; // Handle cases where no match is found
    });

    const filteredSelectedProductsQuantities = selectedProductsQuantities.filter((item) => item !== null);
    SetAllData(filteredSelectedProductsQuantities);
    HandleOpen();

    Notify.displayNotification(
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Invoice.AddProductInvoice_Success" />,
      ),
      'info',
      LightModeState == LightMode().type,
    );
  };
  return (
    <>
      <Dialog
        open={Open}
        handler={HandleOpen}
        size={window.innerWidth < mdbreakpoint ? 'xxl' : 'xl'}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          <div
            className={`m-1 flex justify-center items-center gap-2 font-black  `}
            dangerouslySetInnerHTML={{ __html: Icon }}
          ></div>{' '}
          {Title}
        </DialogHeader>
        <DialogBody divider className={`max-h-[70vh] overflow-scroll`}>
          {Content}

          <InvboxProductTable P_Selected={P_Selected} P_Quantities={P_Quantities} P_Products={P_Products} />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={HandleOpen} className="mr-1">
            <i className="fa-solid fa-arrow-left mx-1"></i>
            <span>
              <TranslatedText TranslationPath="UCP.InvoiceProductList.TabActions.Back" />
            </span>
          </Button>
          <Button variant="filled" onClick={HandleAddProductToInvoice} className="mr-1">
            <i className="fa-solid fa-plus mx-1"></i>
            <span>
              <TranslatedText TranslationPath="UCP.InvoiceProductList.TabActions.Add" />
            </span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
