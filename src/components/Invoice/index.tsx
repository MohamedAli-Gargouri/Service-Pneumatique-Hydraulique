import React from 'react';
import { Card, Tooltip, Checkbox, Input, Button, Spinner, IconButton } from '@material-tailwind/react';
import SplitPane, { Pane } from 'split-pane-react';
import InvoiceProductTable from '../Table/Invoice_SelectedProducts';
import './SplitPane.css';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './PDFGenerator';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { RootState } from 'redux/reducers';
import { useNotify } from 'utils/hooks/useNotify';
const PreviewInvoiceTab = ({ PreviewInvoice, SetPreviewInvoice, GenerateNewPDF, PDFLoaded, GeneratedPDF }) => {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  return (
    <>
      <div className="w-full" style={{ color: 'white', backgroundColor: '#e53935' }}>
        <h5>{t('UCP.Invoice.Title2')}</h5>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center ">
        <div className="w-full flex flex-row  justify-evenly items-center">
          <Tooltip content={t('UCP.Invoice.TabActions.TogglePreview')} placement="top">
            <IconButton
              onClick={() => {
                SetPreviewInvoice(!PreviewInvoice);
              }}
              variant="text"
              className="rounded-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {PreviewInvoice ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </IconButton>
          </Tooltip>

          <Tooltip content={t('UCP.Invoice.TabActions.Refresh')} placement="top">
            <IconButton
              onClick={() => {
                GenerateNewPDF();
              }}
              variant="text"
              className="rounded-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </IconButton>
          </Tooltip>
        </div>
        {PDFLoaded && (
          <Spinner color="blue" className="m-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        )}
        <div className=" flex  justify-center items-center mb-2 h-full w-[95%]" style={{ border: '1px solid black' }}>
          {PreviewInvoice ? (
            <PDFViewer width="100%" height="100%">
              {GeneratedPDF}
            </PDFViewer>
          ) : (
            <p>{t('UCP.Invoice.TabActions.PreviewDisabledMsg')}</p>
          )}
        </div>
      </div>
    </>
  );
};
PreviewInvoiceTab.propTypes = {
  PreviewInvoice: PropTypes.bool.isRequired,
  SetPreviewInvoice: PropTypes.func.isRequired,
  GenerateNewPDF: PropTypes.func.isRequired,
  PDFLoaded: PropTypes.bool.isRequired,
  GeneratedPDF: PropTypes.object.isRequired,
};

const GenerateInvoiceTab = ({
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
  SetProductsData,
}) => {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t, i18n } = useTranslation();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  return (
    <>
      <div className="w-full" style={{ color: 'white', backgroundColor: '#e53935' }}>
        <h5>{t('UCP.Invoice.Title1')}</h5>
      </div>

      <div className="w-full h-full flex flex-col justify-start items-center gap-1">
        <div className="w-full flex justify-around items-center flex-row">
          <PDFDownloadLink document={GeneratedPDF} fileName="SPH Invoice / Estimate">
            {/*===================Handling PDF GENERATION LOADING============== */}
            {({ loading }) => {
              return loading ? (
                <div className="flex flex-col justify-center items-center">
                  {t('UCP.Invoice.TabActions.GeneratingDownload')}
                  <Spinner
                    color="red"
                    className=" m-2 h-5 w-5"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              ) : (
                <Button
                  onClick={ShowDownloadInvoice}
                  className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-file-invoice"></i>
                  {t('UCP.Invoice.TabActions.DownloadInvoice_Estimate')}
                </Button>
              );
            }}
          </PDFDownloadLink>

          <Button
            onClick={() => {
              GenerateNewPDF();
            }}
            className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <i className="fa-solid fa-gears"></i>
            {t('UCP.Invoice.TabActions.GenerateINvoice_Estimate')}
          </Button>
        </div>

        <h4 className="mt-2">
          <i className="fa-solid fa-file-invoice mr-2"></i>
          {t('UCP.Invoice.TabHeader.DocumentType')}
        </h4>

        <div className=" flex justify-evenly w-full">
          <Checkbox
            labelProps={{ style: { color: 'inherit' } }}
            checked={DocumentType == 'Invoice' ? true : false}
            onChange={() => {
              SetDocumentType('Invoice');
            }}
            label={t('UCP.Invoice.TabActions.Invoice')}
            ripple={false}
            className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Checkbox
            labelProps={{ style: { color: 'inherit' } }}
            checked={DocumentType == 'Estimate' ? true : false}
            onChange={() => {
              SetDocumentType('Estimate');
            }}
            label={t('UCP.Invoice.TabActions.Estimate')}
            ripple={false}
            className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </div>
        {DocumentType == 'Invoice' ? (
          <div className=" grid grid-cols-2 justify-center item w-full gap-3 p-2">
            <div className=" col-span-2 mx-2">
              <Input
                containerProps={{ style: { minWidth: '10px' } }}
                variant="outlined"
                type="number"
                defaultValue={0}
                onChange={(e) => {
                  HandleInvoiceValueChanges(e, 'InvoiceNumber');
                }}
                label={t('UCP.Invoice.TabInputs.InvoiceNumber')}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          </div>
        ) : null}

        <h4 className="mt-2">
          <i className="fa-solid fa-user-tag mr-2"></i>
          {t('UCP.Invoice.TabHeader.DemanderInformations')}
        </h4>
        <div className="flex justify-evenly w-full">
          <Checkbox
            labelProps={{ style: { color: 'inherit' } }}
            checked={DemanderType == 'Person' ? true : false}
            onChange={() => {
              setDemanderType('Person');
            }}
            label={t('UCP.Invoice.TabActions.Person')}
            ripple={false}
            className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Checkbox
            labelProps={{ style: { color: 'inherit' } }}
            checked={DemanderType == 'Company' ? true : false}
            onChange={() => {
              setDemanderType('Company');
            }}
            label={t('UCP.Invoice.TabActions.Company')}
            ripple={false}
            className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
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
              DemanderType == 'Person'
                ? t('UCP.Invoice.TabInputs.D_FirstName')
                : t('UCP.Invoice.TabInputs.D_CompanyName')
            }
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          {DemanderType == 'Person' ? (
            <Input
              containerProps={{ style: { minWidth: '10px' } }}
              variant="outlined"
              onChange={(e) => {
                HandleInvoiceValueChanges(e, 'D_LNAME');
              }}
              label={t('UCP.Invoice.TabInputs.D_LastName')}
              className=" col-span-1"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ) : null}
          <Input
            containerProps={{ style: { minWidth: '10px' } }}
            variant="outlined"
            onChange={(e) => {
              HandleInvoiceValueChanges(e, 'D_ADRESS');
            }}
            label={t('UCP.Invoice.TabInputs.D_Adress')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Input
            type="number"
            containerProps={{ style: { minWidth: '10px' } }}
            variant="outlined"
            onChange={(e) => {
              HandleInvoiceValueChanges(e, 'D_PHONE');
            }}
            label={t('UCP.Invoice.TabInputs.D_PhoneNumber')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          {DocumentType == 'Invoice' ? (
            <Input
              type="number"
              defaultValue={0}
              containerProps={{ style: { minWidth: '10px' } }}
              variant="outlined"
              onChange={(e) => {
                HandleInvoiceValueChanges(e, 'D_TAXNUMBER');
              }}
              label={t('UCP.Invoice.TabInputs.D_FiscaleNumber')}
              className=" col-span-1"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ) : null}
        </div>

        <h4 className="mt-2">
          <i className="fa-solid fa-calendar-days mr-2"></i> {t('UCP.Invoice.TabHeader.Invoice_EstimateLimits')}
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
            label={t('UCP.Invoice.TabInputs.CreateDate')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Input
            type="date"
            containerProps={{ style: { minWidth: '10px' } }}
            onChange={(e) => {
              HandleInvoiceValueChanges(e, 'LDATE');
            }}
            variant="outlined"
            label={t('UCP.Invoice.TabInputs.LimitDate')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </div>
        <h4 className="mt-2">
          <i className="fa-solid fa-hand-holding-dollar mr-2"></i>
          {t('UCP.Invoice.TabHeader.TaxDiscount')}
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
            label={t('UCP.Invoice.TabInputs.Discount')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Input
            type="number"
            defaultValue={18}
            containerProps={{ style: { minWidth: '10px' } }}
            onChange={(e) => {
              HandleInvoiceValueChanges(e, 'TAXRATE');
            }}
            variant="outlined"
            label={t('UCP.Invoice.TabInputs.TaxRate')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </div>

        <h4 className="mt-2">
          <i className="fa-solid fa-building mr-2"></i>
          {t('UCP.Invoice.TabHeader.HostInformations')}
        </h4>
        <div className="flex justify-evenly w-full">
          <Checkbox
            labelProps={{ style: { color: 'inherit' } }}
            checked={HostType == 'Person' ? true : false}
            onChange={() => {
              SetHostType('Person');
            }}
            label={t('UCP.Invoice.TabActions.Person')}
            ripple={false}
            className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Checkbox
            labelProps={{ style: { color: 'inherit' } }}
            checked={HostType == 'Company' ? true : false}
            onChange={() => {
              SetHostType('Company');
            }}
            label={t('UCP.Invoice.TabActions.Company')}
            ripple={false}
            className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
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
              HostType == 'Person' ? t('UCP.Invoice.TabInputs.H_FirstName') : t('UCP.Invoice.TabInputs.H_CompanyName')
            }
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          {HostType == 'Person' ? (
            <Input
              containerProps={{ style: { minWidth: '10px' } }}
              variant="outlined"
              onChange={(e) => {
                HandleInvoiceValueChanges(e, 'H_LNAME');
              }}
              label={t('UCP.Invoice.TabInputs.H_LastName')}
              className=" col-span-1"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ) : null}
          <Input
            defaultValue={'Av Med Jammousi Immeuble el HANA 3000 Sfax - Tunis'}
            containerProps={{ style: { minWidth: '10px' } }}
            variant="outlined"
            onChange={(e) => {
              HandleInvoiceValueChanges(e, 'H_ADRESS');
            }}
            label={t('UCP.Invoice.TabInputs.H_Adress')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          <Input
            defaultValue={74227074}
            type="number"
            containerProps={{ style: { minWidth: '10px' } }}
            variant="outlined"
            onChange={(e) => {
              HandleInvoiceValueChanges(e, 'H_PHONE');
            }}
            label={t('UCP.Invoice.TabInputs.H_PhoneNumber')}
            className=" col-span-1"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
          {DocumentType == 'Invoice' ? (
            <Input
              type="number"
              defaultValue={0}
              containerProps={{ style: { minWidth: '10px' } }}
              variant="outlined"
              onChange={(e) => {
                HandleInvoiceValueChanges(e, 'H_TAXNUMBER');
              }}
              label={t('UCP.Invoice.TabInputs.H_FiscaleNumber')}
              className=" col-span-1"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          ) : null}
        </div>

        <h4 className="mt-2 ">{t('UCP.Invoice.TabHeader.Invoice_Estimate_Products')}</h4>
        <InvoiceProductTable ProductsData={ProductsData} SetProductsData={SetProductsData} />
      </div>
    </>
  );
};
GenerateInvoiceTab.propTypes = {
  DocumentType: PropTypes.oneOf(['Estimate', 'Invoice']).isRequired,
  GeneratedPDF: PropTypes.object.isRequired,
  ShowDownloadInvoice: PropTypes.func.isRequired,
  GenerateNewPDF: PropTypes.func.isRequired,
  SetDocumentType: PropTypes.func.isRequired,
  HandleInvoiceValueChanges: PropTypes.func.isRequired,
  DemanderType: PropTypes.string.isRequired,
  setDemanderType: PropTypes.func.isRequired,
  HostType: PropTypes.oneOf(['Person', 'Company']).isRequired,
  SetHostType: PropTypes.func.isRequired,
  ProductsData: PropTypes.array.isRequired,
  SetProductsData: PropTypes.func.isRequired,
};

const Invoice = () => {
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const { t, i18n } = useTranslation();
  const { displayNotification, displayPromiseNotification } = useNotify();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);

  const [DemanderType, setDemanderType] = React.useState('Company');
  const [DocumentType, SetDocumentType] = React.useState('Estimate');
  const [HostType, SetHostType] = React.useState('Company');
  const [sizes, setSizes] = React.useState([100, '4%', 'auto']);
  const [PreviewInvoice, SetPreviewInvoice] = React.useState(false);
  const InvoiceNumber = React.useRef(0);
  const D_FirstName = React.useRef('');
  const D_LastName = React.useRef('');
  const D_Adress = React.useRef('');
  const D_PhoneNumber = React.useRef(0);
  const D_TaxNumber = React.useRef(0);

  const H_FirstName = React.useRef('Service Pneumatique Hydraulique SPH');
  const H_LastName = React.useRef('');
  const H_Adress = React.useRef('Av Med Jammousi Immeuble el HANA 3000 Sfax - Tunis');
  const H_PhoneNumber = React.useRef(74227074);
  const H_TaxNumber = React.useRef(0);

  const CreationDate = React.useRef(new Date().toISOString().substr(0, 10));
  const LimitDate = React.useRef('');
  const Discount = React.useRef(0);
  const TaxRate = React.useRef(18);
  const [ProductsData, SetProductsData] = React.useState([]);
  const [PDFLoaded, SetPDFLoaded] = React.useState(false);
  const [GeneratedPDF, SetGeneratedPDF] = React.useState(
    <InvoicePDF
      InvoiceNumber={InvoiceNumber.current}
      //HostType={HostType}
      // DemanderType={DemanderType}
      DocumentType={DocumentType}
      SetPDFLoaded={SetPDFLoaded}
      //PreviewInvoice={PreviewInvoice}
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
    InvoiceNumber.current = 0;
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
        //  HostType={HostType}
        // DemanderType={DemanderType}
        DocumentType={DocumentType}
        SetPDFLoaded={SetPDFLoaded}
        // PreviewInvoice={PreviewInvoice}
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
    displayNotification(t('UCP.DialogMessages.Invoice.DownloadInvoice_Success'), 'info');
  };

  //This function handles fetching data from the input DOM elements and updating the refs
  const HandleInvoiceValueChanges = debounce((e, type) => {
    switch (type) {
      case 'InvoiceNumber':
        InvoiceNumber.current = parseInt(e.target.value);
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
        className={`hidden lg:block  rounded-md p-0 w-full m-4 `}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          className="rounded-md"
          sashRender={function (index: number, active: boolean): React.ReactNode {
            throw new Error('Function not implemented.');
          }}
        >
          <Pane
            key={'P'}
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
      <div className={` w-full h-full lg:hidden `}>
        <Card
          className=" text-current bg-transparent rounded-md rounded-r-none flex flex-col justify-start items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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
        </Card>

        <Card
          className={`text-current bg-transparent mt-2 h-[90vh] rounded-md rounded-l-none flex flex-col justify-center items-center `}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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
