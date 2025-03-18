import React, { useMemo } from "react";
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Theme from "../theme";
import useResponsive from "../hooks/useResponsive";

const ModalPagar = ({ product, totalPrice, onClose }) => {
    const { wp, hp, rem } = useResponsive();

    const dynamicStyles = useMemo(() => StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)"
        },
        modalContent: {
            width: "80%",
            backgroundColor: Theme.colors.textLight,
            padding: Theme.spacing.lg,
            borderRadius: Theme.radius.medium,
            alignItems: "center",
            position: "relative" // Permite posicionar el botón de cierre
        },
        closeIcon: {
            position: "absolute",
            top: Theme.spacing.sm,
            right: Theme.spacing.sm,
            padding: Theme.spacing.xs,
            zIndex: 10 // Asegura que el botón esté sobre el contenido
        },
        title: {
            fontSize: rem(24),
            fontWeight: "bold",
            color: Theme.colors.textDark
        },
        image: {
            width: wp(50),
            height: wp(50),
            borderRadius: Theme.radius.small
        },
        price: {
            fontSize: rem(18),
            color: Theme.colors.neutralDark,
            marginBottom: Theme.spacing.md,
            marginTop: Theme.spacing.md
        },
        label: {
            fontSize: rem(16),
            marginBottom: Theme.spacing.sm,
            fontWeight: "bold",
            color: Theme.colors.textDark
        },
        total: {
            fontSize: rem(18),
            fontWeight: "bold",
            marginVertical: Theme.spacing.md,
            color: Theme.colors.textDark
        },
        closeButton: {
            backgroundColor: Theme.colors.accent,
            padding: Theme.spacing.md,
            borderRadius: Theme.radius.small,
            marginTop: Theme.spacing.md,
            width: wp(50)
        },
        closeButtonText: {
            color: Theme.colors.textLight,
            fontWeight: "bold",
            textAlign: 'center'
        }
    }), [wp, hp, rem]);

    return (
        <Modal visible={!!product} transparent animationType="slide">
            <View style={dynamicStyles.modalContainer}>
                <View style={dynamicStyles.modalContent}>
                    {/* Botón de cierre en la esquina superior derecha */}
                    <TouchableOpacity style={dynamicStyles.closeIcon} onPress={onClose}>
                        <Ionicons name="close" size={rem(24)} color={Theme.colors.accent} />
                    </TouchableOpacity>

                    <Text style={dynamicStyles.title}>Pagar {product.name}</Text>

                    <Text style={dynamicStyles.price}>Cuenta: 1220654654313165</Text>
                    <Text style={dynamicStyles.label}>QR</Text>
                    <Image source={require("../assets/qr.png")} style={dynamicStyles.image} />

                    {/* Total a pagar */}
                    <Text style={dynamicStyles.total}>Total a pagar: Bs {totalPrice.toLocaleString("es-BO")}</Text>

                    {/* Botón para cerrar */}
                    <TouchableOpacity style={dynamicStyles.closeButton} onPress={onClose}>
                        <Text style={dynamicStyles.closeButtonText}>Sacar Captura</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalPagar;
