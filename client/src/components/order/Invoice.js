import React from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const Invoice = ({ order }) => ( 
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title} fixed>
         {new Date().toLocaleString()} 
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>EnigmaMart</Text>
      <Text style={styles.subtitle}>Order Summary</Text>

      <Text style={styles.text}>
        <Text>
          Date: {"               "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </Text>
        {"\n"}
        <Text>
          Order Id: {"         "}
          {order.paymentIntent.id}
        </Text>
        {"\n"}
        <Text>
          Order Status: {"  "}
          {order.orderStatus}
        </Text>
        {"\n"}
        <Text>
          Total Paid: {"       "}
          {order.paymentIntent.amount/=100}
        </Text>
      </Text>

      <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    
   
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  title: {
    paddingTop:"100px",
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
 header: {
 
 
  borderBottomWidth: 1,
  alignItems: 'center',
  height: 24,
  textAlign: 'center',
  fontStyle: 'bold',
  flexGrow: 1,
  width:"15%"
    
 },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
   textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
   fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default Invoice; 

