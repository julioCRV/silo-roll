import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function DetailsScreen({ navigation }) {
    const openMaps = () => {
        Linking.openURL("https://maps.app.goo.gl/JhtXKwHVuAFvfjJq5?g_st=aw");
    };

    return (
        <View style={styles.container}>
            {/* Logo de la empresa */}
            <Image source={require("../assets/logo-siloroll.png")} style={styles.logo} />

            <Text style={styles.title}>Bienvenido a SiloRoll</Text>

            <Text style={styles.description}>
                <Text style={styles.bold}>SiloRoll</Text> es una empresa especializada en el{" "}
                <Text style={styles.bold}>empaquetamiento de ensilaje de alta densidad</Text>. Nuestro proceso sella el contenido con una{" "}
                <Text style={styles.bold}>malla elástica</Text> y lo blinda con <Text style={styles.bold}>film stretch</Text>, asegurando la conservación
                óptima de los nutrientes en todo el tiempo de almacenamiento.
            </Text>

            <Text style={styles.description}>
                <Text style={styles.bold}>Nuestra misión</Text> es garantizar un suministro confiable de{" "}
                <Text style={styles.bold}>alimentos de calidad</Text> para el sector ganadero boliviano, ofreciendo productos bien conservados y listos
                en los momentos clave para los productores comprometidos con la excelencia alimentaria.
            </Text>

            {/* Sección de ubicación */}
            <Text style={styles.locationTitle}>📍 ¿Dónde encontrarnos?</Text>
            <TouchableOpacity onPress={openMaps}>
                <Text style={styles.locationLink}>Abrir en Google Maps</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2c3e50",
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 100,
        overflow: "hidden",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#f1c40f",
        textAlign: "center",
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: "#ecf0f1",
        textAlign: "center",
        marginBottom: 15,
        lineHeight: 22,
    },
    bold: {
        fontWeight: "bold",
        color: "#f1c40f",
    },
    locationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#f1c40f",
        marginTop: 20,
    },
    locationLink: {
        fontSize: 16,
        color: "#3498db",
        textDecorationLine: "underline",
        marginTop: 5,
    },
});
