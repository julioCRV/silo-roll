import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalPagar from "./ModalPagar";

const PurchaseModal = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState("1");

    // Extraer el precio numérico del string
    const pricePerTon = product.mount;

    // Validar entrada y calcular total
    const sanitizedQuantity = parseInt(quantity) || 1;  // Evita valores no numéricos
    const totalPrice = sanitizedQuantity * pricePerTon;

    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <Modal visible={!!product} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    {/* Botón de cierre en la esquina superior derecha */}
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#DC3545" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Comprar {product.name}</Text>
                    <Text style={styles.price}>Precio por tonelada: {product.price}</Text>

                    {/* Campo de entrada para la cantidad */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Cantidad (Toneladas):</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))} // Solo permite números
                        />
                    </View>

                    {/* Total a pagar */}
                    <Text style={styles.total}>Total a pagar: Bs {totalPrice.toLocaleString("es-BO")}</Text>

                    {/* Botón para pagar */}
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProduct(product)}>
                        <Text style={styles.closeButtonText}>Pagar</Text>
                    </TouchableOpacity>

                    {selectedProduct && (
                        <ModalPagar product={selectedProduct} totalPrice={totalPrice} onClose={() => setSelectedProduct(null)} />
                    )}
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
    price: { fontSize: 16, color: "#555", marginBottom: 10 },
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

export default PurchaseModal;
