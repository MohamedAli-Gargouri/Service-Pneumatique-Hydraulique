import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import PropTypes from "prop-types"
InvoiceFooter.propTypes={
  ShowContact:PropTypes.bool.isRequired
}
export default function InvoiceFooter({ ShowContact }) {
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
  return (
    <>
      {ShowContact && (
        <View style={styles.footer}>
          <View>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              CONTACT SIÈGE SOCIAL
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Adress - <Text style={{ fontSize: 9 }}>Rte de Gabes KM 0.5</Text>
            </Text>
            <Text style={{ fontSize: 11 }}>
              Immeuble Elfrikha Sfax - Tunisie
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Tele - <Text style={{ fontSize: 9 }}>(+216) 74 21 18 76</Text>
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Fax - <Text style={{ fontSize: 9 }}>(+216) 74 22 66 09</Text>
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Email - <Text style={{ fontSize: 9 }}>sph@sph-tn.com</Text>
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              CONTACT POINT DE VENTE
            </Text>

            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Adress -{' '}
              <Text style={{ fontSize: 9 }}>Av Med Jammousi Immeuble </Text>
            </Text>
            <Text style={{ fontSize: 11 }}>el HANA 3000 Sfax - Tunis</Text>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Tele - <Text style={{ fontSize: 9 }}>(+216) 74 22 70 74</Text>
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Fax - <Text style={{ fontSize: 9 }}>(+216) 74 22 70 78</Text>
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'black' }}>
              Email - <Text style={{ fontSize: 9 }}>info@sph-tn.com</Text>
            </Text>
          </View>
        </View>
      )}

      <View style={styles.HeaderContainer}>
        <View
          style={{ backgroundColor: '#e53935', width: '100%', height: '10rem' }}
        ></View>
      </View>
    </>
  );
}
