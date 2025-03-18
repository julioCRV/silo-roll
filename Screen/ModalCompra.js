import React, { useState, useMemo } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalPagar from "./ModalPagar";
import useResponsive from "../hooks/useResponsive";
import Theme from "../theme";

const PurchaseModal = ({ product, onClose }) => {
    const { wp, hp, rem, rf } = useResponsive();
    const [quantity, setQuantity] = useState("1");

    // Extraer el precio numérico del string
    const pricePerTon = product.mount;

    // Validar entrada y calcular total
    const sanitizedQuantity = Math.max(1, parseInt(quantity) || 1);  // Evita valores no numéricos y asegura que sea al menos 1
    const totalPrice = sanitizedQuantity * pricePerTon;

    const [selectedProduct, setSelectedProduct] = useState(null);

    const dynamicStyles = useMemo(() => StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)"
        },
        modalContent: {
            width: wp(80),
            backgroundColor: Theme.colors.neutralLight,
            padding: wp(5),
            borderRadius: Theme.radius.medium,
            alignItems: "center",
            position: "relative" // Permite posicionar el botón de cierre
        },
        closeIcon: {
            position: "absolute",
            top: wp(2),
            right: wp(2),
            padding: wp(1),
            zIndex: 10 // Asegura que el botón esté sobre el contenido
        },
        title: {
            fontSize: rf(Theme.typography.heading),
            fontWeight: "bold"
        },
        price: {
            fontSize: rf(Theme.typography.body),
            color: Theme.colors.neutralDark,
            marginBottom: hp(1)
        },
        inputContainer: {
            width: "100%",
            marginVertical: hp(1),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        label: {
            fontSize: rf(Theme.typography.body),
            marginBottom: hp(0.5),
            fontWeight: "bold"
        },
        input: {
            width: "60%",
            borderWidth: 1,
            borderColor: Theme.colors.primary,
            padding: wp(2),
            borderRadius: Theme.radius.small,
            fontSize: rf(Theme.typography.body),
            textAlign: "center"
        },
        button: {
            width: "15%",
            alignItems: "center",
            justifyContent: "center",
            padding: wp(2),
            borderRadius: Theme.radius.small,
            backgroundColor: Theme.colors.primary
        },
        buttonText: {
            color: Theme.colors.textLight,
            fontWeight: "bold"
        },
        total: {
            fontSize: rf(Theme.typography.body),
            fontWeight: "bold",
            marginVertical: hp(1)
        },
        closeButton: {
            backgroundColor: Theme.colors.accent,
            padding: wp(2),
            borderRadius: Theme.radius.small,
            marginTop: hp(1),
            width: wp(40)
        },
        closeButtonText: {
            color: Theme.colors.textLight,
            fontWeight: "bold",
            textAlign: 'center'
        },
    }), [wp, hp, rf]);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => (parseInt(prevQuantity) + 1).toString());
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => Math.max(1, parseInt(prevQuantity) - 1).toString());
    };

    return (
        <Modal visible={!!product} transparent animationType="slide">
            <View style={dynamicStyles.modalContainer}>
                <View style={dynamicStyles.modalContent}>

                    {/* Botón de cierre en la esquina superior derecha */}
                    <TouchableOpacity style={dynamicStyles.closeIcon} onPress={onClose}>
                        <Ionicons name="close" size={24} color={Theme.colors.accent} />
                    </TouchableOpacity>

                    <Text style={dynamicStyles.title}>Comprar {product.name}</Text>
                    <Text style={dynamicStyles.price}>Precio por tonelada: {product.price}</Text>

                    {/* Campo de entrada para la cantidad */}
                    <View style={dynamicStyles.inputContainer}>
                        <TouchableOpacity style={dynamicStyles.button} onPress={handleDecrement}>
                            <Text style={dynamicStyles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={dynamicStyles.input}
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))} // Solo permite números
                        />
                        <TouchableOpacity style={dynamicStyles.button} onPress={handleIncrement}>
                            <Text style={dynamicStyles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Total a pagar */}
                    <Text style={dynamicStyles.total}>Total a pagar: Bs {totalPrice.toLocaleString("es-BO")}</Text>

                    {/* Botón para pagar */}
                    <TouchableOpacity style={dynamicStyles.closeButton} onPress={() => setSelectedProduct(product)}>
                        <Text style={dynamicStyles.closeButtonText}>Pagar</Text>
                    </TouchableOpacity>

                    {selectedProduct && (
                        <ModalPagar product={selectedProduct} totalPrice={totalPrice} onClose={() => setSelectedProduct(null)} />
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default PurchaseModal;
