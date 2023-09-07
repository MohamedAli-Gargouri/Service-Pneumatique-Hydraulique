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

import SPHLOGO from '../../assets/images/SPH Logo.png';
// Invoice component
export default function PDFContent({
  Discount,
  TaxRate,
  ProductsData,
  Data,
  ShowTotal,
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
      width: '40%',
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
      left: '5%',
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
  const CalculateTotal = (Products) => {
    let total = 0;
    Products.forEach((product) => {
      total += product.Quantity * product.Price;
    });
    return total;
  };

  const subTotal_value = CalculateTotal(ProductsData);

  const taxAmount = (subTotal_value * (TaxRate / 100)).toFixed(2);

  const discountAmount = (subTotal_value * (Discount / 100)).toFixed(2);

  const total = (
    subTotal_value +
    parseFloat(taxAmount) -
    parseFloat(discountAmount)
  ).toFixed(2);

  return (
    <>
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableCell}>
              <Text>Product</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Quantity</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Price (HT)</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Total (HT)</Text>
            </View>
          </View>
          {Data.map((product, index) => (
            <View key={"PDFRow"+index} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{product.Brand}</Text>
                <Text>{product.Model}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{product.Quantity}x</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{product.Price} TND (HT)</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>
                  {(product.Quantity * product.Price).toFixed(2)} TND (HT)
                </Text>
              </View>
            </View>
          ))}
        </View>

        {ShowTotal && (
          <>
            {/*=============================TOTAL/TAXES-S=================================== */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <View style={styles.SubTable}>
                <View style={styles.tableHeader}>
                  <Text style={{ fontSize: 12 }}>Sub Total </Text>
                  <Text style={{ fontSize: 12 }}>{subTotal_value} TND</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <View style={styles.SubTable}>
                <View style={styles.tableHeader}>
                  <Text style={{ fontSize: 12 }}>Discount </Text>
                  <Text style={{ fontSize: 12 }}>{Discount}%</Text>
                  <Text style={{ fontSize: 12 }}>-{discountAmount} TND</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <View style={styles.SubTable}>
                <View style={styles.tableHeader}>
                  <Text style={{ fontSize: 12 }}>Tax Rate </Text>
                  <Text style={{ fontSize: 12 }}>{TaxRate}%</Text>
                  <Text style={{ fontSize: 12 }}>+{taxAmount} TND</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <View style={styles.SubTable}>
                <View style={styles.tableHeader}>
                  <Text style={{ fontSize: 12 }}>Total (TTC) </Text>
                  <Text style={{ fontSize: 12 }}>{total} TND</Text>
                </View>
              </View>
            </View>
            {/*=============================TOTAL/TAXES-E=================================== */}
          </>
        )}
      </View>
    </>
  );
}
