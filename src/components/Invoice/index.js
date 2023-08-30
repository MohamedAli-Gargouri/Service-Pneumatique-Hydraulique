import React, { useRef } from 'react';
import { Card,Tooltip, Typography,Input,Button,Spinner,IconButton } from "@material-tailwind/react";
import SplitPane, { Pane } from 'split-pane-react';
import InvoiceProductTable from "../Table/Invoice_SelectedProducts"
import "./SplitPane.css"
import {Page,Text,Image,Document,StyleSheet,PDFViewer} from "@react-pdf/renderer"
import Product_1 from "../../assets/images/products/product_1.png"
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from "./PDFGenerator"
import debounce from 'lodash/debounce';
import { useSelector } from "react-redux/es/hooks/useSelector";
import {LightMode,DarkMode} from "../../redux/actions/LightActions"

const Invoice = () => {
const LightModeState=useSelector(state=>state.lightMode)
const [sizes, setSizes] = React.useState([100, '4%', 'auto']);
const  [PreviewInvoice,SetPreviewInvoice]= React.useState(false)
const FirstName = React.useRef("");
const LastName= React.useRef("");
const Adress = React.useRef("");
const PhoneNumber = React.useRef("");
const CreationDate = React.useRef(new Date().toISOString().substr(0, 10));
const LimitDate = React.useRef("");
const Discount = React.useRef("");
const TaxRate = React.useRef(18);
const [ProductsData, SetProductsData] = React.useState([]);
const [PDFLoaded, SetPDFLoaded] = React.useState(false);
const [GeneratedPDF, SetGeneratedPDF] = React.useState(<Document>
  <Page style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
  <Text>Your document is not generated yet, click</Text>
  <Text style={{ textDecoration:"underline", color:"red"}}>Generate Invoice.</Text>
    </Page>
</Document>
);

const GenerateNewPDF=(()=>{
  SetPDFLoaded(true)
  const pdf = (
    <InvoicePDF
      SetPDFLoaded={SetPDFLoaded}
      PreviewInvoice={PreviewInvoice}
      FirstName={FirstName.current}
      LastName={LastName.current}
      Adress={Adress.current}
      PhoneNumber={PhoneNumber.current}
      CreationDate={CreationDate.current}
      LimitDate={LimitDate.current}
      Discount={Discount.current}
      TaxRate={TaxRate.current}
      ProductsData={ProductsData}
    />
  );
  SetGeneratedPDF(pdf)
})

//This function handles fetching data from the input DOM elements and updating the refs
const HandleInvoiceValueChanges=debounce((e,type)=>
{
  switch (type) {
    case 'FNAME':
      FirstName.current=e.target.value
      break;
    case 'LNAME':
      LastName.current= e.target.value
      break;
    case 'ADRESS':
      Adress.current= e.target.value
      break;
    case 'PHONE':
      PhoneNumber.current= e.target.value
      break;
    case 'CDATE':
      CreationDate.current= e.target.value
      break;
    case 'LDATE':
      LimitDate.current= e.target.value
      break;
    case 'DISCOUNT':
      Discount.current= e.target.value
      break;
    case 'TAXRATE':
      TaxRate.current= e.target.value  
        break;
  }
}, 300)
  return (<>

  {/*============================HERE IS THE DESKTOP VERSION================================================*/}
    <Card  className={`hidden lg:block  rounded-md p-0 w-full min-h-[72vh] h-auto m-4 z-0   ${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2":"tc-darkTheme_T1 bg-darkTheme_T2"}`} >
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        className='rounded-md'
      >
        <Pane  minSize={10} maxSize='70%' className='rounded-md rounded-r-none flex flex-col justify-start items-center'>
             <div className='w-full' style={{ color:"white",backgroundColor:"#e53935"}}> <h5>Generate Invoice </h5></div>

             <div className='w-full h-full flex flex-col justify-start items-center gap-1'>
                
             <div className='w-full flex justify-around items-center flex-row'>
                <PDFDownloadLink 
                document={GeneratedPDF}             
                fileName='form'>             
            {/*===================Handling PDF GENERATION LOADING============== */}
          {({ loading }) =>{

            return(
              loading ?
              <div className='flex flex-col justify-center items-center'>
                <p>Generating your download please wait...</p>
                <Spinner color="red" className=" m-2 h-5 w-5" />
                </div>    
                  :     
                <Button className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2">
                <i class="fa-solid fa-file-invoice"></i>
                 Download Invoice
                </Button>
            )
          } }


        </PDFDownloadLink>

        <Button onClick={()=>{GenerateNewPDF()}} className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2">
        <i class="fa-solid fa-gears"></i>
        Generate Invoice
        </Button>

        </div>

                <h4 className='mt-2'> Demander Information</h4>
                <div className=' grid grid-cols-2 justify-evenly w-full gap-3 p-2'>
                <Input containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"FNAME")}} label="First Name" className=' col-span-1' />
                <Input containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"LNAME")}} label="Last Name" className=' col-span-1' />
                <Input containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"ADRESS")}} label="Adress" className=' col-span-1' />
                <Input type='number' containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"PHONE")}} label="Phone Number" className=' col-span-1' />
                </div>
                <h4 className='mt-2'> Invoice Details </h4>
                <div className=' grid grid-cols-2 justify-evenly w-full gap-3 p-2'>
                <Input type='date' defaultValue={new Date().toISOString().substr(0, 10)} containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"CDATE")}} variant="outlined" label="Creation Date" className=' col-span-1' />
                <Input type='date' containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"LDATE")}} variant="outlined" label="Limit Date" className=' col-span-1' />
                </div>
                <h4 className='mt-2'> Tax & Discount </h4>
                <div className=' grid grid-cols-2 justify-evenly w-full gap-3 p-2'>
                <Input type='number' defaultValue={0} containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"DISCOUNT")}} variant="outlined" label="Discount" className=' col-span-1' />
                <Input type='number' defaultValue={18} containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"TAXRATE")}} variant="outlined" label="Tax rate" className=' col-span-1' />
                </div>
                <h4 className='mt-2'> Products </h4>
                <InvoiceProductTable ProductsData={ProductsData} SetProductsData={SetProductsData}/>
             </div>
        
        </Pane>
        <Pane minSize={10} maxSize='70%' className='rounded-md rounded-l-none flex flex-col justify-center items-center'>
            <div className='w-full' style={{color:"white",backgroundColor:"#e53935"}}>
            <h5>Preview Invoice </h5>
            </div>
            <div className='w-full h-full flex flex-col justify-start items-center '>  


        <div className='w-full flex flex-row  justify-evenly items-center'>

        <Tooltip content="Toggle Preview" placement="top">
        <IconButton onClick={()=>{SetPreviewInvoice(!PreviewInvoice)}} variant='text' className="rounded-full">
        {PreviewInvoice?<i class="fa-solid fa-eye-slash"></i>:<i class="fa-solid fa-eye"></i>}
        </IconButton>
        </Tooltip>
         

        <Tooltip content="Refresh Preview" placement="top">
        <IconButton onClick={()=>{GenerateNewPDF()}} variant='text' className="rounded-full">
        <i class="fa-solid fa-arrows-rotate"></i>
        </IconButton> 
        </Tooltip>
        </div>
        {PDFLoaded&&<Spinner color="blue" className='m-4' />}     
        {PreviewInvoice?
          <PDFViewer width='100%' height='100%' style={{overflow:"scroll"}} >
            {GeneratedPDF}
          </PDFViewer>
         :
          <p>Preview is disabled.</p>
       
        }
             

        </div>
        </Pane>


      </SplitPane>
      </Card>
{/*============================HERE IS THE MOBILE VERSION================================================*/}
<div  className={` w-full h-full lg:hidden ${LightModeState==LightMode().type?"tc-whiteTheme_T1 bg-whiteTheme_T2Z":"tc-darkTheme_T1 bg-darkTheme_T2"}`} >

        <Card  className=' rounded-md rounded-r-none flex flex-col justify-start items-center'>
             <div className='w-full m-2' style={{ color:"white",backgroundColor:"#e53935"}}> <h5>Generate Invoice </h5></div>

             <div className='w-full h-full flex flex-col justify-start items-center gap-1'>
                
             <div className='w-full flex justify-around items-center flex-row'>
                <PDFDownloadLink 
                document={GeneratedPDF}              
                fileName='form'>             
            {/*===================Handling PDF GENERATION LOADING============== */}
          {({ loading }) =>{

            return(
              loading ?
              <div className='flex flex-col justify-center items-center'>
                <p>Generating your download please wait...</p>
                <Spinner color="red" className=" m-2 h-5 w-5" />
                </div>    
                  :     
                <Button className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2">
                <i class="fa-solid fa-file-invoice"></i>
                 Download Invoice
                </Button>
            )
          } }


        </PDFDownloadLink>

        <Button onClick={()=>{GenerateNewPDF()}} className=" justify-items-stretch flex items-center gap-3 col-span-2 m-2">
        <i class="fa-solid fa-arrows-rotate"></i>
        Generate Invoice
        </Button>

        </div>

                <h4 className='mt-2'> Demander Information</h4>
                <div className=' grid grid-cols-2 justify-evenly w-full gap-3 p-2'>
                <Input containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"FNAME")}} label="First Name" className=' col-span-1' />
                <Input containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"LNAME")}} label="Last Name" className=' col-span-1' />
                <Input containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"ADRESS")}} label="Adress" className=' col-span-1' />
                <Input type='number' containerProps={{style: {minWidth: '10px', }}} variant="outlined" onChange={(e)=>{HandleInvoiceValueChanges(e,"PHONE")}} label="Phone Number" className=' col-span-1' />
                </div>
                <h4 className='mt-2'> Invoice Details </h4>
                <div className=' grid grid-cols-2 justify-evenly w-full gap-3 p-2'>
                <Input type='date' defaultValue={new Date().toISOString().substr(0, 10)} containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"CDATE")}} variant="outlined" label="Creation Date" className=' col-span-1' />
                <Input type='date' containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"LDATE")}} variant="outlined" label="Limit Date" className=' col-span-1' />
                </div>
                <h4 className='mt-2'> Tax & Discount </h4>
                <div className=' grid grid-cols-2 justify-evenly w-full gap-3 p-2'>
                <Input type='number' defaultValue={0} containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"DISCOUNT")}} variant="outlined" label="Discount" className=' col-span-1' />
                <Input type='number' defaultValue={18} containerProps={{style: {minWidth: '10px', }}}  onChange={(e)=>{HandleInvoiceValueChanges(e,"TAXRATE")}} variant="outlined" label="Tax rate" className=' col-span-1' />
                </div>
                <h4 className='mt-2'> Products </h4>
                <InvoiceProductTable ProductsData={ProductsData} SetProductsData={SetProductsData}/>
             </div>
        
        </Card>


           



        <Card  className='mt-2 h-[90vh] rounded-md rounded-l-none flex flex-col justify-center items-center'>
            <div className='w-full' style={{color:"white",backgroundColor:"#e53935"}}>
            <h5>Preview Invoice </h5>
            </div>
            <div className='p-2 w-full h-full flex flex-col justify-start items-center '>  


        <div className='w-full flex flex-row  justify-evenly items-center'>

        
        <IconButton onClick={()=>{SetPreviewInvoice(!PreviewInvoice)}} variant='text' className="rounded-full">
        {PreviewInvoice?<i class="fa-solid fa-eye-slash"></i>:<i class="fa-solid fa-eye"></i>}
        </IconButton>
      
         

        <IconButton onClick={()=>{GenerateNewPDF()}} variant='text' className="rounded-full">
        <i class="fa-solid fa-arrows-rotate"></i>
        </IconButton> 
 
        </div>

         {PDFLoaded&&<Spinner color="blue" className='m-4' />}  
              
        {PreviewInvoice?
          !PDFLoaded&&<PDFViewer width='100%' height="100%" className=' shadow-lg mb-4' style={{ border:"1px solid black",overflow:"scroll"}} >
            {GeneratedPDF}
          </PDFViewer>
         :<div style={{border:"1px solid black"}} className='shadow-lg mb-4 flex w-full h-full justify-center items-center'>
            <p>Preview is disabled.</p>
         </div>
          
       
        }
             

        </div>
        </Card>



      </div>

</>
  );
};

export default Invoice;
