import React, { useRef, useState } from 'react';
import {
  Card,
  Tooltip,
  Radio,
  Switch,
  Checkbox,
  Typography,
  Input,
  Button,
  Spinner,
  IconButton,
} from '@material-tailwind/react';
import SplitPane, { Pane } from 'split-pane-react';
import InvoiceProductTable from '../Table/Invoice_SelectedProducts';
import './SplitPane.css';
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import Product_1 from '../../assets/images/products/product_1.webp';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './PDFGenerator';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import TranslatedText from '../../utils/Translation';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import { CreateToast } from '../../utils/Toast';
import ReactDOMServer from 'react-dom/server';


const PreviewInvoiceTab=({
  PreviewInvoice,
  SetPreviewInvoice,
  GenerateNewPDF,
  PDFLoaded,
  GeneratedPDF

})=>{

  return(
    <>
             <div
            className="w-full"
            style={{ color: 'white', backgroundColor: '#e53935' }}
          >
            <h5>
              <TranslatedText TranslationPath="UCP.Invoice.Title2" />
            </h5>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-center ">
            <div className="w-full flex flex-row  justify-evenly items-center">
              <Tooltip
                content={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.TogglePreview" />
                }
                placement="top"
              >
                <IconButton
                  onClick={() => {
                    SetPreviewInvoice(!PreviewInvoice);
                  }}
                  variant="text"
                  className="rounded-full"
                >
                  {PreviewInvoice ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip
                content={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.Refresh" />
                }
                placement="top"
              >
                <IconButton
                  onClick={() => {
                    GenerateNewPDF();
                  }}
                  variant="text"
                  className="rounded-full"
                >
                  <i className="fa-solid fa-arrows-rotate"></i>
                </IconButton>
              </Tooltip>
            </div>
            {PDFLoaded && <Spinner color="blue" className="m-4" />}
            <div
              className=" flex  justify-center items-center mb-2 h-full w-[95%]"
              style={{ border: '1px solid black' }}
            >
              {PreviewInvoice ? (
                <PDFViewer
                  width="100%"
                  height="100%"
                  style={{ overflow: 'scroll' }}
                >
                  {GeneratedPDF}
                </PDFViewer>
              ) : (
                <p>
                  {
                    <TranslatedText TranslationPath="UCP.Invoice.TabActions.PreviewDisabledMsg" />
                  }
                </p>
              )}
            </div>
          </div></>
  )

}
const GenerateInvoiceTab=({
  DocumentType,
  GeneratedPDF,
  ShowDownloadInvoice,
  GenerateNewPDF,
  SetDocumentType,
  HandleInvoiceValueChanges,
  DemanderType,
  setDemanderType,
  HostType,
  SetHostType,
  ProductsData,
  SetProductsData
})=>
{
  return(
    <>
              <div
            className="w-full"
            style={{ color: 'white', backgroundColor: '#e53935' }}
          >
            {' '}
            <h5>
              <TranslatedText TranslationPath="UCP.Invoice.Title1" />{' '}
            </h5>
          </div>

          <div className="w-full h-full flex flex-col justify-start items-center gap-1">
            <div className="w-full flex justify-around items-center flex-row">
              <PDFDownloadLink document={GeneratedPDF} fileName="SPH Invoice / Estimate">
                {/*===================Handling PDF GENERATION LOADING============== */}
                {({ loading }) => {
                  return loading ? (
                    <div className="flex flex-col justify-center items-center">
                          <TranslatedText TranslationPath="UCP.Invoice.TabActions.GeneratingDownload" />
                      <Spinner color="red" className=" m-2 h-5 w-5" />
                    </div>
                  ) : (
                    <Button
                      onClick={ShowDownloadInvoice}
                      className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2"
                    >
                      <i className="fa-solid fa-file-invoice"></i>
                        <TranslatedText TranslationPath="UCP.Invoice.TabActions.DownloadInvoice_Estimate" />
                   
                    </Button>
                  );
                }}
              </PDFDownloadLink>

              <Button
                onClick={() => {
                  GenerateNewPDF();
                }}
                className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2"
              >
                <i className="fa-solid fa-gears"></i>
                {
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.GenerateINvoice_Estimate" />
                }
              </Button>
            </div>

            <h4 className="mt-2">
              <i className="fa-solid fa-file-invoice mr-2"></i>{' '}
              {
                <TranslatedText TranslationPath="UCP.Invoice.TabHeader.DocumentType" />
              }
            </h4>

            <div className=" flex justify-evenly w-full">
              <Checkbox
                labelProps={{ style: { color: 'inherit' } }}
                checked={DocumentType == 'Invoice' ? true : false}
                onChange={() => {
                  SetDocumentType('Invoice');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.Invoice" />
                }
                ripple={false}
                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
              />
              <Checkbox
                labelProps={{ style: { color: 'inherit' } }}
                checked={DocumentType == 'Estimate' ? true : false}
                onChange={() => {
                  SetDocumentType('Estimate');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.Estimate" />
                }
                ripple={false}
                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
              />
            </div>
            {DocumentType == 'Invoice' ? (
              <div className=" grid grid-cols-2 justify-center item w-full gap-3 p-2">
                <div className=" col-span-2 mx-2">
                  <Input
                    containerProps={{ style: { minWidth: '10px' } }}
                    variant="outlined"
                    type="number"
                    onChange={(e) => {
                      HandleInvoiceValueChanges(e, 'InvoiceNumber');
                    }}
                    label={
                      <TranslatedText TranslationPath="UCP.Invoice.TabInputs.InvoiceNumber" />
                    }
                  />
                </div>
              </div>
            ) : null}

            <h4 className="mt-2">
              <i className="fa-solid fa-user-tag mr-2"></i>{' '}
              {
                <TranslatedText TranslationPath="UCP.Invoice.TabHeader.DemanderInformations" />
              }
            </h4>
            <div className="flex justify-evenly w-full">
              <Checkbox
                labelProps={{ style: { color: 'inherit' } }}
                checked={DemanderType == 'Person' ? true : false}
                onChange={() => {
                  setDemanderType('Person');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.Person" />
                }
                ripple={false}
                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
              />
              <Checkbox
                labelProps={{ style: { color: 'inherit' } }}
                checked={DemanderType == 'Company' ? true : false}
                onChange={() => {
                  setDemanderType('Company');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.Company" />
                }
                ripple={false}
                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
              />
            </div>
            <div className=" grid grid-cols-2 justify-evenly w-full gap-3 p-2">
              <Input
                containerProps={{ style: { minWidth: '10px' } }}
                variant="outlined"
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'D_FNAME');
                }}
                label={
                  DemanderType == 'Person' ? (
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.D_FirstName" />
                  ) : (
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.D_CompanyName" />
                  )
                }
                className=" col-span-1"
              />
              {DemanderType == 'Person' ? (
                <Input
                  containerProps={{ style: { minWidth: '10px' } }}
                  variant="outlined"
                  onChange={(e) => {
                    HandleInvoiceValueChanges(e, 'D_LNAME');
                  }}
                  label={
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.D_LastName" />
                  }
                  className=" col-span-1"
                />
              ) : null}
              <Input
                containerProps={{ style: { minWidth: '10px' } }}
                variant="outlined"
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'D_ADRESS');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.D_Adress" />
                }
                className=" col-span-1"
              />
              <Input
                type="number"
                containerProps={{ style: { minWidth: '10px' } }}
                variant="outlined"
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'D_PHONE');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.D_PhoneNumber" />
                }
                className=" col-span-1"
              />
              {DocumentType == 'Invoice' ? (
                <Input
                  containerProps={{ style: { minWidth: '10px' } }}
                  variant="outlined"
                  onChange={(e) => {
                    HandleInvoiceValueChanges(e, 'D_TAXNUMBER');
                  }}
                  label={
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.D_FiscaleNumber" />
                  }
                  className=" col-span-1"
                />
              ) : null}
            </div>

            <h4 className="mt-2">
              <i className="fa-solid fa-calendar-days mr-2"></i>{' '}
              {
                <TranslatedText TranslationPath="UCP.Invoice.TabHeader.Invoice_EstimateLimits" />
              }
            </h4>
            <div className=" grid grid-cols-2 justify-evenly w-full gap-3 p-2">
              <Input
                type="date"
                defaultValue={new Date().toISOString().substr(0, 10)}
                containerProps={{ style: { minWidth: '10px' } }}
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'CDATE');
                }}
                variant="outlined"
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.CreateDate" />
                }
                className=" col-span-1"
              />
              <Input
                type="date"
                containerProps={{ style: { minWidth: '10px' } }}
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'LDATE');
                }}
                variant="outlined"
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.LimitDate" />
                }
                className=" col-span-1"
              />
            </div>
            <h4 className="mt-2">
              <i className="fa-solid fa-hand-holding-dollar mr-2"></i>{' '}
              {
                <TranslatedText TranslationPath="UCP.Invoice.TabHeader.TaxDiscount" />
              }{' '}
            </h4>
            <div className=" grid grid-cols-2 justify-evenly w-full gap-3 p-2">
              <Input
                type="number"
                defaultValue={0}
                containerProps={{ style: { minWidth: '10px' } }}
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'DISCOUNT');
                }}
                variant="outlined"
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.Discount" />
                }
                className=" col-span-1"
              />
              <Input
                type="number"
                defaultValue={18}
                containerProps={{ style: { minWidth: '10px' } }}
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'TAXRATE');
                }}
                variant="outlined"
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.TaxRate" />
                }
                className=" col-span-1"
              />
            </div>

            <h4 className="mt-2">
              <i className="fa-solid fa-building mr-2"></i>{' '}
              {
                <TranslatedText TranslationPath="UCP.Invoice.TabHeader.HostInformations" />
              }
            </h4>
            <div className="flex justify-evenly w-full">
              <Checkbox
                labelProps={{ style: { color: 'inherit' } }}
                checked={HostType == 'Person' ? true : false}
                onChange={() => {
                  SetHostType('Person');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.Person" />
                }
                ripple={false}
                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
              />
              <Checkbox
                labelProps={{ style: { color: 'inherit' } }}
                checked={HostType == 'Company' ? true : false}
                onChange={() => {
                  SetHostType('Company');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabActions.Company" />
                }
                ripple={false}
                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
              />
            </div>
            <div className=" grid grid-cols-2 justify-evenly w-full gap-3 p-2">
              <Input
                defaultValue={'Service Pneumatique Hydraulique SPH'}
                containerProps={{ style: { minWidth: '10px' } }}
                variant="outlined"
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'H_FNAME');
                }}
                label={
                  HostType == 'Person' ? (
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.H_FirstName" />
                  ) : (
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.H_CompanyName" />
                  )
                }
                className=" col-span-1"
              />
              {HostType == 'Person' ? (
                <Input
                  containerProps={{ style: { minWidth: '10px' } }}
                  variant="outlined"
                  onChange={(e) => {
                    HandleInvoiceValueChanges(e, 'H_LNAME');
                  }}
                  label={
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.H_LastName" />
                  }
                  className=" col-span-1"
                />
              ) : null}
              <Input
                defaultValue={
                  'Av Med Jammousi Immeuble el HANA 3000 Sfax - Tunis'
                }
                containerProps={{ style: { minWidth: '10px' } }}
                variant="outlined"
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'H_ADRESS');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.H_Adress" />
                }
                className=" col-span-1"
              />
              <Input
                defaultValue={74227074}
                type="number"
                containerProps={{ style: { minWidth: '10px' } }}
                variant="outlined"
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'H_PHONE');
                }}
                label={
                  <TranslatedText TranslationPath="UCP.Invoice.TabInputs.H_PhoneNumber" />
                }
                className=" col-span-1"
              />
              {DocumentType == 'Invoice' ? (
                <Input
                  containerProps={{ style: { minWidth: '10px' } }}
                  variant="outlined"
                  onChange={(e) => {
                    HandleInvoiceValueChanges(e, 'H_TAXNUMBER');
                  }}
                  label={
                    <TranslatedText TranslationPath="UCP.Invoice.TabInputs.H_FiscaleNumber" />
                  }
                  className=" col-span-1"
                />
              ) : null}
            </div>

            <h4 className="mt-2 ">
              {' '}
              {
                <TranslatedText TranslationPath="UCP.Invoice.TabHeader.Invoice_Estimate_Products" />
              }{' '}
            </h4>
            <InvoiceProductTable
              ProductsData={ProductsData}
              SetProductsData={SetProductsData}
            />
          </div>
    </>
  )
}

const Invoice = () => {
  const [DemanderType, setDemanderType] = React.useState('Company');
  const [DocumentType, SetDocumentType] = React.useState('Estimate');
  const [HostType, SetHostType] = React.useState('Company');

  const LightModeState = useSelector((state) => state.lightMode);
  const [sizes, setSizes] = React.useState([100, '4%', 'auto']);
  const [PreviewInvoice, SetPreviewInvoice] = React.useState(false);

  const InvoiceNumber = React.useRef('');

  const D_FirstName = React.useRef('');
  const D_LastName = React.useRef('');
  const D_Adress = React.useRef('');
  const D_PhoneNumber = React.useRef('');
  const D_TaxNumber = React.useRef('');

  const H_FirstName = React.useRef('Service Pneumatique Hydraulique SPH');
  const H_LastName = React.useRef('');
  const H_Adress = React.useRef(
    'Av Med Jammousi Immeuble el HANA 3000 Sfax - Tunis',
  );
  const H_PhoneNumber = React.useRef(74227074);
  const H_TaxNumber = React.useRef('');

  const CreationDate = React.useRef(new Date().toISOString().substr(0, 10));
  const LimitDate = React.useRef('');
  const Discount = React.useRef(0);
  const TaxRate = React.useRef(18);
  const [ProductsData, SetProductsData] = React.useState([]);
  const [PDFLoaded, SetPDFLoaded] = React.useState(false);
  const [GeneratedPDF, SetGeneratedPDF] = React.useState(
    <InvoicePDF
      InvoiceNumber={InvoiceNumber.current}
      HostType={HostType}
      DemanderType={DemanderType}
      DocumentType={DocumentType}
      SetPDFLoaded={SetPDFLoaded}
      PreviewInvoice={PreviewInvoice}
      D_FirstName={D_FirstName.current}
      D_LastName={D_LastName.current}
      D_Adress={D_Adress.current}
      D_PhoneNumber={D_PhoneNumber.current}
      D_TaxNumber={D_TaxNumber.current}
      H_FirstName={H_FirstName.current}
      H_LastName={H_LastName.current}
      H_Adress={H_Adress.current}
      H_PhoneNumber={H_PhoneNumber.current}
      H_TaxNumber={H_TaxNumber.current}
      CreationDate={CreationDate.current}
      LimitDate={LimitDate.current}
      Discount={Discount.current}
      TaxRate={TaxRate.current}
      ProductsData={ProductsData}
    />,
  );

  React.useEffect(() => {
    InvoiceNumber.current = '';
  }, [DocumentType]);

  React.useEffect(() => {
    D_LastName.current = '';
  }, [DemanderType]);

  React.useEffect(() => {
    H_LastName.current = '';
  }, [HostType]);

  const GenerateNewPDF = () => {
    SetPDFLoaded(true);
    const pdf = (
      <InvoicePDF
        InvoiceNumber={InvoiceNumber.current}
        HostType={HostType}
        DemanderType={DemanderType}
        DocumentType={DocumentType}
        SetPDFLoaded={SetPDFLoaded}
        PreviewInvoice={PreviewInvoice}
        D_FirstName={D_FirstName.current}
        D_LastName={D_LastName.current}
        D_Adress={D_Adress.current}
        D_PhoneNumber={D_PhoneNumber.current}
        D_TaxNumber={D_TaxNumber.current}
        H_FirstName={H_FirstName.current}
        H_LastName={H_LastName.current}
        H_Adress={H_Adress.current}
        H_PhoneNumber={H_PhoneNumber.current}
        H_TaxNumber={H_TaxNumber.current}
        CreationDate={CreationDate.current}
        LimitDate={LimitDate.current}
        Discount={Discount.current}
        TaxRate={TaxRate.current}
        ProductsData={ProductsData}
      />
    );
    SetGeneratedPDF(pdf);
  };

  const ShowDownloadInvoice = () => {
    CreateToast(
      null,
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Invoice.DownloadInvoice_Success" />,
      ),
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Invoice.DownloadInvoice_Success" />,
      ),
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Invoice.DownloadInvoice_Success" />,
      ),
      ReactDOMServer.renderToStaticMarkup(
        <TranslatedText TranslationPath="UCP.DialogMessages.Invoice.DownloadInvoice_Error" />,
      ),
      'info',
      LightModeState == LightMode().type,
    );
  };

  //This function handles fetching data from the input DOM elements and updating the refs
  const HandleInvoiceValueChanges = debounce((e, type) => {
    switch (type) {
      case 'InvoiceNumber':
        InvoiceNumber.current = e.target.value;
        break;
      case 'D_FNAME':
        D_FirstName.current = e.target.value;
        break;
      case 'D_LNAME':
        D_LastName.current = e.target.value;
        break;
      case 'D_ADRESS':
        D_Adress.current = e.target.value;
        break;
      case 'D_PHONE':
        D_PhoneNumber.current = e.target.value;
        break;
      case 'D_TAXNUMBER':
        D_TaxNumber.current = e.target.value;
        break;

      case 'H_FNAME':
        H_FirstName.current = e.target.value;
        break;
      case 'H_LNAME':
        H_LastName.current = e.target.value;
        break;
      case 'H_ADRESS':
        H_Adress.current = e.target.value;
        break;
      case 'H_PHONE':
        H_PhoneNumber.current = e.target.value;
        break;
      case 'H_TAXNUMBER':
        H_TaxNumber.current = e.target.value;
        break;

      case 'CDATE':
        CreationDate.current = e.target.value;
        break;
      case 'LDATE':
        LimitDate.current = e.target.value;
        break;
      case 'DISCOUNT':
        Discount.current = e.target.value;
        break;
      case 'TAXRATE':
        TaxRate.current = e.target.value;
        break;
    }
  }, 300);

  return (
    <>
      {/*============================HERE IS THE DESKTOP VERSION================================================*/}
      <Card
        className={`hidden lg:block  rounded-md p-0 w-full m-4    ${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1 bg-whiteTheme_T2'
            : 'tc-darkTheme_T1 bg-darkTheme_T2'
        }`}
      >
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          className="rounded-md"
        >
          <Pane
            key={"P"}
            minSize={10}
            maxSize="70%"
            className=" rounded-md rounded-r-none flex flex-col justify-start items-center"
          >

            <GenerateInvoiceTab
              DocumentType={DocumentType}
              GeneratedPDF={GeneratedPDF}
              ShowDownloadInvoice={ShowDownloadInvoice}
              GenerateNewPDF={GenerateNewPDF}
              SetDocumentType={SetDocumentType}
              HandleInvoiceValueChanges={HandleInvoiceValueChanges}
              DemanderType={DemanderType}
              setDemanderType={setDemanderType}
              HostType={HostType}
              SetHostType={SetHostType}
              ProductsData={ProductsData}
              SetProductsData={SetProductsData}
            />
           
          </Pane>
          <Pane
            minSize={10}
            maxSize="70%"
            className="rounded-md rounded-l-none flex flex-col justify-center items-center"
          >
          <PreviewInvoiceTab
            PreviewInvoice={PreviewInvoice}
            SetPreviewInvoice={SetPreviewInvoice}
            GenerateNewPDF={GenerateNewPDF}
            PDFLoaded={PDFLoaded}
            GeneratedPDF={GeneratedPDF} 
            />
          </Pane>
        </SplitPane>
      </Card>
      {/*============================HERE IS THE MOBILE VERSION================================================*/}
      <div
        className={` w-full h-full lg:hidden ${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1 bg-whiteTheme_T2Z'
            : 'tc-darkTheme_T1 bg-darkTheme_T2'
        }`}
      >
        <Card className=" text-current bg-transparent rounded-md rounded-r-none flex flex-col justify-start items-center">
        <GenerateInvoiceTab
              DocumentType={DocumentType}
              GeneratedPDF={GeneratedPDF}
              ShowDownloadInvoice={ShowDownloadInvoice}
              GenerateNewPDF={GenerateNewPDF}
              SetDocumentType={SetDocumentType}
              HandleInvoiceValueChanges={HandleInvoiceValueChanges}
              DemanderType={DemanderType}
              setDemanderType={setDemanderType}
              HostType={HostType}
              SetHostType={SetHostType}
              ProductsData={ProductsData}
              SetProductsData={SetProductsData}
            />
        </Card>

        <Card
          className={`text-current bg-transparent mt-2 h-[90vh] rounded-md rounded-l-none flex flex-col justify-center items-center `}
        >
            <PreviewInvoiceTab 
              PreviewInvoice={PreviewInvoice}
              SetPreviewInvoice={SetPreviewInvoice}
              GenerateNewPDF={GenerateNewPDF}
              PDFLoaded={PDFLoaded}
              GeneratedPDF={GeneratedPDF}
               />
        </Card>
      </div>
    </>
  );
};

export default Invoice;
