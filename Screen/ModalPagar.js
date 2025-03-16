import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ModalPagar = ({ product, totalPrice, onClose }) => {

    return (
        <Modal visible={!!product} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    {/* Botón de cierre en la esquina superior derecha */}
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#DC3545" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Pagar {product.name}</Text>

                    <Text style={styles.price}>Cuenta: 1220654654313165</Text>
                    <Text style={styles.label}>QR</Text>
                    <Image source={require("../assets/qr.png")} style={styles.image} />

                    {/* Total a pagar */}
                    <Text style={styles.total}>Total a pagar: Bs {totalPrice.toLocaleString("es-BO")}</Text>

                    {/* Botón para cerrar */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Pagar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: {
        width: "80%",
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        position: "relative" // Permite posicionar el botón de cierre
    },
    closeIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 5,
        zIndex: 10 // Asegura que el botón esté sobre el contenido
    },
    title: { fontSize: 20, fontWeight: "bold" },
    image: { width: 100, height: 100, borderRadius: 10 },
    price: { fontSize: 18, color: "#555", marginBottom: 10, marginTop: 20 },
    inputContainer: { width: "100%", marginVertical: 10 },
    label: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#28A745",
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
        textAlign: "center"
    },
    total: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
    closeButton: { backgroundColor: "#DC3545", padding: 10, borderRadius: 5, marginTop: 10, width: 100 },
    closeButtonText: { color: "#FFF", fontWeight: "bold", textAlign: 'center' },
});

export default ModalPagar;
