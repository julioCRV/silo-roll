import React, { useState, useMemo, useCallback } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Boton from "../components/Boton";
import Theme from "../theme";
import useResponsive from "../hooks/useResponsive";
import ModalCompra from "./ModalCompra";

const ProductList = () => {
    const { wp, isTablet, themeScaler } = useResponsive();
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // Se calcula los valores del dispositivo , valores dinamicos
    const numColumns = isTablet ? 2 : 1;
    const cardWidth = wp(isTablet ? 45 : 90);
    const imageSize = wp(30);

    // estilos dinamicos: 
    const dynamicStyles = useMemo(() => ({
        card: { width: cardWidth },
        image: { width: imageSize, height: imageSize },
      }), [cardWidth, imageSize]);

    // se mejoro el renderizado con el usecallback
    const renderProductCard = useCallback(({ item }) => (
        <View style={[styles.card, dynamicStyles.card]}>
            <Text style={styles.name}>{item.name}</Text>
            <Image
                source={item.image}
                style={[styles.image, dynamicStyles.image]}
                resizeMode="contain"
            />
            <Text style={styles.price}>{item.price}</Text>
            <Boton
                title="Comprar"
                onPress={() => setSelectedProduct(item)}
                style={styles.button}
                textStyle={styles.buttonText}
            />
        </View>
    ), [cardWidth, imageSize]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tienda</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProductCard}
                numColumns={numColumns}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
            />
            {selectedProduct && (
                <ModalCompra
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)} 
                />
            )}
        </View>
    );
};

const products = [
    {
        id: 1,
        name: "Silo Maíz",
        price: "Bs 1.100 x Tonelada",
        mount: 1100,
        image: require("../assets/img-silo.png"),
    },
    {
        id: 2,
        name: "Silo Sorgo",
        price: "Bs 1.050 x Tonelada",
        mount: 1050,
        image: require("../assets/img-silo.png"),
    },
    {
        id: 3,
        name: "TMR Ración Completa",
        price: "Bs 1.550 x Tonelada",
        mount: 1550,
        image: require("../assets/img-silo.png"),
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Theme.spacing.lg,
        backgroundColor: Theme.colors.neutralDark
    },
    card: {
        backgroundColor: Theme.colors.neutralLight,
        borderRadius: Theme.radius.medium,
        padding: Theme.spacing.sm,
        margin: Theme.spacing.xs,
        alignItems: "center",
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        shadowColor: Theme.colors.neutralDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        marginVertical: Theme.spacing.md,
    },
    name: {
        fontSize: Theme.typography.subheading,
        color: Theme.colors.primary,
        fontWeight: '700',
        textAlign: 'center',
    },
    price: {
        fontSize: Theme.typography.body,
        fontWeight: '600',
        color: Theme.colors.accent,
        marginVertical: Theme.sm,
    },
    button: {
        backgroundColor: Theme.colors.accent,
        borderRadius: Theme.radius.medium,
        paddingVertical: Theme.spacing.xs,
        paddingHorizontal: Theme.spacing.xs,
        marginTop: Theme.spacing.xs,
    },
    buttonText: {
        color: Theme.colors.textLight,
        fontSize: Theme.typography.body,
        fontWeight: 'bold',
    },
    title: {
        fontSize: Theme.typography.heading,
        color: Theme.colors.primary,
        padding: Theme.spacing.xl,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    listContent: {
        alignItems: 'center',
        paddingBottom: Theme.spacing.sm,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default ProductList;