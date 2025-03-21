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
        image: require("../assets/maiz.png"),
    },
    {
        id: 2,
        name: "Silo Sorgo",
        price: "Bs 1.050 x Tonelada",
        mount: 1050,
        image: require("../assets/sorgo.png"),
    },
    {
        id: 3,
        name: "TMR Ración Completa",
        price: "Bs 1.550 x Tonelada",
        mount: 1550,
        image: require("../assets/TMR.png"),
    },
];

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: "#737373" },
    card: { backgroundColor: "#FFF", padding: 10, borderRadius: 10, marginBottom: 10, alignItems: "center", elevation: 3 },
    image: { width: 100, height: 100, borderRadius: 10 },
    name: { fontSize: 20, fontWeight: "bold" },
    price: { fontSize: 18, color: "#555" },
    button: { backgroundColor: "#28A745", padding: 10, borderRadius: 30, marginTop: 5, alignItems: "center", width: 100 },
    buttonText: { color: "#FFF", fontWeight: "bold" },
    title: { fontSize: 32, textAlign: 'center', padding: 20 }
});

export default ProductList;