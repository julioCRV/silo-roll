
import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import ModalCompra from "./ModalCompra";

const ProductList = () => {
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
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tienda</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.price}>{item.price}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setSelectedProduct(item)}
                        >
                            <Text style={styles.buttonText}>Comprar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            {selectedProduct && (
                <ModalCompra product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: "#2c3e50" },
    card: { backgroundColor: "#FFF", padding: 10, borderRadius: 10, marginBottom: 10, alignItems: "center", elevation: 3 },
    image: { width: 100, height: 100, borderRadius: 10 },
    name: { fontSize: 20, fontWeight: "bold" },
    price: { fontSize: 18, color: "#555" },
    button: { backgroundColor: "#28A745", padding: 10, borderRadius: 30, marginTop: 5, alignItems: "center", width: 100 },
    buttonText: { color: "#FFF", fontWeight: "bold" },
    title: { fontSize: 32, textAlign: 'center', padding: 20 }
});

export default ProductList;

