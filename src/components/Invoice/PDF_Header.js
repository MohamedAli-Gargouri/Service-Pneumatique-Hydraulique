import React from 'react';
import {
  Page,
  Font,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

import SPHLOGO from '../../assets/images/SPH Logo.webp';
// Invoice component
export default function InvoiceHeader({
  InvoiceNumber,
  DocumentType,
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
  ShowClientInformation,
}) {
  // Define styles for the PDF
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
    },
    section: {
      flexGrow: 1,
      borderStyle: 'solid',
      border: 1,
      borderWidth: 0,
      borderColor: 'black',
      padding: 10,
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
      justifyContent: 'space-between',
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#F0F0F0',
      fontWeight: 'bold',
      padding: 8,
    },
    tableCell: {
      padding: 4,
      fontSize: 10,
    },
    logo: {
      width: '100rem',
      height: '55rem',
      margin: '10px',
    },
    productimg: {
      width: '30rem',
      height: '30rem',
    },
    HeaderContainer: {
      fontSize: '35',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    HContainerBetween: {
      fontSize: '15',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 50,
      padding: 10,
    },
    VContainerEnd: {
      fontSize: '15',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    VContainerStart: {
      fontSize: '15',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    footer: {
      padding: 10,
      position: 'absolute',
      bottom: 30, // Adjust this value as needed to control the footer's position
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          left: '5%',
        }}
      >
        <Image src={SPHLOGO} style={styles.logo} />

        <View>
          <Text style={{ fontSize: 11, fontWeight: 'black' }}>
            Company{' '}
            <Text style={{ fontSize: 9 }}>
              {H_FirstName} {H_LastName}
            </Text>
          </Text>
          <Text style={{ fontSize: 11, fontWeight: 'black' }}>
            Address: <Text style={{ fontSize: 9 }}>{H_Adress}</Text>
          </Text>
          <Text style={{ fontSize: 11, fontWeight: 'black' }}>
            Phone Num: <Text style={{ fontSize: 9 }}>{H_PhoneNumber}</Text>
          </Text>
          {DocumentType == 'Invoice' ? (
            <Text style={{ fontSize: 11, fontWeight: 'black' }}>
              Tax Registration:{' '}
              <Text style={{ fontSize: 9 }}>{H_TaxNumber}</Text>
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.HeaderContainer}>
        <View
          style={{ backgroundColor: '#e53935', width: '60%', height: '15rem' }}
        ></View>
        <View>
          <Text>{DocumentType}</Text>
          {DocumentType == 'Invoice' ? (
            <Text style={{ fontSize: 9, fontWeight: 'black' }}>
              Invoice Num:{' '}
              <Text style={{ fontSize: 7, fontWeight: 'black' }}>
                {InvoiceNumber}
              </Text>
            </Text>
          ) : null}
        </View>
        <View
          style={{ backgroundColor: '#e53935', width: '15%', height: '15rem' }}
        ></View>
      </View>

      {ShowClientInformation && (
        <View style={styles.HContainerBetween}>
          <View>
            <Text style={{ fontSize: 11, fontWeight: 'black' }}>
              Billed to{' '}
              <Text style={{ fontSize: 9 }}>
                {D_FirstName} {D_LastName}
              </Text>
            </Text>
            <Text style={{ fontSize: 11, fontWeight: 'black' }}>
              Address: <Text style={{ fontSize: 9 }}>{D_Adress}</Text>
            </Text>
            <Text style={{ fontSize: 11, fontWeight: 'black' }}>
              Phone Num: <Text style={{ fontSize: 9 }}>{D_PhoneNumber}</Text>
            </Text>
            {DocumentType == 'Invoice' ? (
              <Text style={{ fontSize: 11, fontWeight: 'black' }}>
                Tax Registration:{' '}
                <Text style={{ fontSize: 9 }}>{D_TaxNumber}</Text>
              </Text>
            ) : null}
          </View>
          <View style={styles.LimitsContainer}>
            <Text style={{ fontSize: 11, fontWeight: 'black' }}>
              Creation Date: <Text style={{ fontSize: 9 }}>{CreationDate}</Text>
            </Text>
            <Text style={{ fontSize: 11, fontWeight: 'black' }}>
              Limit Date: <Text style={{ fontSize: 9 }}>{LimitDate}</Text>
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
