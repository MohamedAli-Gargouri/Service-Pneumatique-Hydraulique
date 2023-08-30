import React from 'react';
import { Page,Font, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';


import SPHLOGO from "../../assets/images/SPH Logo.png"
// Invoice component
export default function InvoiceHeader({
  FirstName,
  LastName,
  Adress,
  PhoneNumber,
  CreationDate,
  LimitDate,
  ShowClientInformation
}) 
{
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
     marginBottom:50,
     padding:10
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

  return (
    <>
        <Image src={SPHLOGO} style={styles.logo} />
        <View style={styles.HeaderContainer}>
        <View style={{backgroundColor:"#e53935",width:"60%",height:"15rem"}}></View>
        <Text>Facture</Text>          
        <View style={{backgroundColor:"#e53935",width:"15%",height:"15rem"}}></View>
        </View>

        {ShowClientInformation&&
        <View style={styles.HContainerBetween}>
        <View>
        <Text style={{ fontSize:11,fontWeight:"black"}}>Billed to Mr/Ms <Text style={{ fontSize:9}}>{FirstName} {LastName}</Text></Text>
        <Text style={{ fontSize:11,fontWeight:"black"}}>Address: <Text style={{ fontSize:9}} >{Adress}</Text></Text>
        <Text style={{ fontSize:11,fontWeight:"black"}}>Phone Number: <Text style={{ fontSize:9}}>{PhoneNumber}</Text></Text>
        </View>
        <View style={styles.LimitsContainer}>
        <Text style={{ fontSize:13,fontWeight:"black"}}>Creation Date: <Text style={{ fontSize:9}}>{CreationDate}</Text></Text>
        <Text style={{ fontSize:13,fontWeight:"black"}} >Limit Date: <Text style={{ fontSize:9}}>{LimitDate}</Text></Text>
        </View>
        </View>
        }

        </>
  );
};


