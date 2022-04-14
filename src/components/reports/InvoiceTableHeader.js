import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  id: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  cliente: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  telefono: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.id}>ID</Text>
    <Text style={styles.cliente}>Cliente</Text>
    <Text style={styles.telefono}>Teléfono</Text>
    <Text style={styles.amount}>Fecha</Text>
    <Text style={styles.amount}>Hora</Text>
    <Text style={styles.amount}>Mesas</Text>
  </View>
);

export default InvoiceTableHeader;
