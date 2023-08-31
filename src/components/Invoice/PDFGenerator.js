import React from 'react';
import { Page,Font, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import PDFContent from './PDF_Content';
import PDFFooter from "./PDF_Footer"
import PDFHeader from "./PDF_Header"
import SPHLOGO from "../../assets/images/SPH Logo.png"
export default function InvoiceTemplate({
  InvoiceNumber,
  DocumentType,
  SetPDFLoaded,
  D_FirstName,
  D_LastName,
  D_Adress,
  D_PhoneNumber,
  D_TaxNumber,
  H_FirstName,
  H_LastName,
  H_Adress,
  H_PhoneNumber,
  H_TaxNumber,
  CreationDate,
  LimitDate,
  Discount,
  TaxRate,
  ProductsData,
}) 
{

      console.log(H_FirstName)

  // Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  section: {
    flexGrow: 1,
    borderStyle:"solid",
    border: 1,
    borderWidth:0,
    borderColor:"black",
    padding:10
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  SubTable: {
    width: '30%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  tableRow: {
    padding: 4,
    flexDirection: 'row',
    justifyContent:"space-between",
  },
  tableHeader: {
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor: '#F0F0F0',
    fontWeight: 'bold',
    padding: 8,
  },
  tableCell: {
    padding: 4,
    fontSize: 10,
  },
  logo:
  {
     left:"5%",
     width:"100rem",
     height:"55rem",
     margin:"10px"
  },
  productimg:
  {
     width:"30rem",
     height:"30rem",
  },
  HeaderContainer:
  {
     fontSize:"35",
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center",
     
  },
  HContainerBetween:
  {
     fontSize:"15",
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center",
     marginTop:20,
     marginBottom:50
  },
  VContainerEnd:
  {
    fontSize:"15",
     flexDirection:"column",
     justifyContent:"center",
     alignItems:"flex-end"
  },
  VContainerStart:
  {
    fontSize:"15",
     flexDirection:"column",
     justifyContent:"center",
     alignItems:"flex-start"
  },
  footer: {
    padding:10,
    position: 'absolute',
    bottom: 30, // Adjust this value as needed to control the footer's position
    left: 0,
    right: 0,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  
});

const ProductsLimitPerPage = 8;
var NbPages = Math.ceil(ProductsData.length==0?1:ProductsData.length / ProductsLimitPerPage);
  return (
    <Document onRender={()=>{SetPDFLoaded(false)}}>
      
      {
        Array.from({ length: NbPages }, (_, pageIndex) =>{
          var currentPage=pageIndex+1
          //======First page==========//
        if(currentPage==1)
        {     
        return(<Page size="A4" style={styles.page}>

              <PDFHeader 
              InvoiceNumber={InvoiceNumber}
              DocumentType={DocumentType}
              D_FirstName={D_FirstName}
              D_LastName={D_LastName}
              D_Adress={D_Adress}
              D_PhoneNumber={D_PhoneNumber}
              D_TaxNumber={D_TaxNumber}
              H_FirstName={H_FirstName}
              H_LastName={H_LastName}
              H_Adress={H_Adress}
              H_PhoneNumber={H_PhoneNumber}
              H_TaxNumber={H_TaxNumber}
              CreationDate ={CreationDate}
              LimitDate ={LimitDate}
              ShowClientInformation={true} />

              <PDFContent
                Discount={Discount}
                TaxRate={TaxRate}
                ProductsData={ProductsData}
                Data={ProductsData.slice(pageIndex*ProductsLimitPerPage,NbPages==1? ProductsData.length:pageIndex*ProductsLimitPerPage+ProductsLimitPerPage)}
                ShowTotal={NbPages==1}
              />

              <PDFFooter 
              ShowContact={NbPages==1}
              />

        </Page>)
              
      }
      else
      {/* ==========If we are in the last page and our invoice contains more than one page========== */}
      if(currentPage==NbPages && NbPages!=1)
      {

        return(<Page size="A4" style={styles.page}>
              <PDFHeader 
              InvoiceNumber={InvoiceNumber}
              DocumentType={DocumentType}
              D_FirstName={D_FirstName}
              D_LastName={D_LastName}
              D_Adress={D_Adress}
              D_PhoneNumber={D_PhoneNumber}
              D_TaxNumber={D_TaxNumber}
              H_FirstName={H_FirstName}
              H_LastName={H_LastName}
              H_Adress={H_Adress}
              H_PhoneNumber={H_PhoneNumber}
              H_TaxNumber={H_TaxNumber}
              CreationDate ={CreationDate}
              LimitDate ={LimitDate}
              ShowClientInformation={false} />

              <PDFContent
              Discount={Discount}
              TaxRate={TaxRate}
              ProductsData={ProductsData}
              Data={ProductsData.slice(pageIndex*ProductsLimitPerPage,ProductsData.length)}
              ShowTotal={true}
              />

              <PDFFooter 
              ShowContact={true}
              />
      </Page>)
     }else
      {/* ==========If we are in the middle NbPages and our invoice contains more than one page========== */}
      if(currentPage!=NbPages && NbPages!=1)
      {

        return(<Page size="A4" style={styles.page}>
              <PDFHeader 
              InvoiceNumber={InvoiceNumber}
              DocumentType={DocumentType}
              D_FirstName={D_FirstName}
              D_LastName={D_LastName}
              D_Adress={D_Adress}
              D_PhoneNumber={D_PhoneNumber}
              D_TaxNumber={D_TaxNumber}
              H_FirstName={H_FirstName}
              H_LastName={H_LastName}
              H_Adress={H_Adress}
              H_PhoneNumber={H_PhoneNumber}
              H_TaxNumber={H_TaxNumber}
              CreationDate ={CreationDate}
              LimitDate ={LimitDate}
              ShowClientInformation={false} />

              <PDFContent
              Discount={Discount}
              TaxRate={TaxRate}
              ProductsData={ProductsData}
              Data={ProductsData.slice(pageIndex*ProductsLimitPerPage, pageIndex*ProductsLimitPerPage+ProductsLimitPerPage)}
              ShowTotal={false}
              />

              <PDFFooter 
              ShowContact={false}
              />
      </Page>)
            }
        }
        
        )
      }
      
    </Document>
  );
};


