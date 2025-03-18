import React , {useMemo}from "react";
import useResponsive from '../hooks/useResponsive';
import Theme from '../theme';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function DetailsScreen() {
    const { wp, hp, rem } = useResponsive();

    const dynamicStyles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Theme.colors.neutralDark,
            paddingHorizontal: wp(6),
        },
        logo: {
            width: wp(50),
            height: wp(50),
            resizeMode: "contain",
            marginBottom: hp(2),
            backgroundColor: Theme.colors.textLight,
            borderRadius: wp(25),
            overflow: "hidden",
        },
        title: {
            fontSize: rem(40),
            fontWeight: "bold",
            color: Theme.colors.accent,
            marginBottom: hp(2),
        },
        description: {
            fontSize: rem(20),
            color: Theme.colors.textLight,
            marginBottom: hp(2),
            lineHeight: rem(20),
        },
        bold: {
            fontWeight: "bold",
            color: Theme.colors.accent,
        },
        locationTitle: {
            fontSize: rem(20),
            fontWeight: "bold",
            color: Theme.colors.accent,
            marginTop: hp(2),
        },
        locationLink: {
            fontSize: rem(15),
            color: Theme.colors.primary,
            textDecorationLine: "underline",
            marginTop: hp(1),
        },
    }), [wp, hp, rem]);

    const openMaps = () => {
        Linking.openURL("https://maps.app.goo.gl/JhtXKwHVuAFvfjJq5?g_st=aw");
    };

    return (
        <View style={dynamicStyles.container}>
            {/* Logo de la empresa */}
            <Image source={require("../assets/logo-siloroll.png")} style={dynamicStyles.logo} />

            <Text style={dynamicStyles.title}>Bienvenido a SiloRoll</Text>

            <Text style={dynamicStyles.description}>
                <Text style={dynamicStyles.bold}>SiloRoll</Text> es una empresa especializada en el{" "}
                <Text style={dynamicStyles.bold}>empaquetamiento de ensilaje de alta densidad</Text>. Nuestro proceso sella el contenido con una{" "}
                <Text style={dynamicStyles.bold}>malla elástica</Text> y lo blinda con <Text style={dynamicStyles.bold}>film stretch</Text>, asegurando la conservación
                óptima de los nutrientes en todo el tiempo de almacenamiento.
            </Text>

            <Text style={dynamicStyles.description}>
                <Text style={dynamicStyles.bold}>Nuestra misión</Text> es garantizar un suministro confiable de{" "}
                <Text style={dynamicStyles.bold}>alimentos de calidad</Text> para el sector ganadero boliviano, ofreciendo productos bien conservados y listos
                en los momentos clave para los productores comprometidos con la excelencia alimentaria.
            </Text>

            {/* Sección de ubicación */}
            <Text style={dynamicStyles.locationTitle}>📍 ¿Dónde encontrarnos?</Text>
            <TouchableOpacity onPress={openMaps}>
                <Text style={dynamicStyles.locationLink}>Abrir en Google Maps</Text>
            </TouchableOpacity>
        </View>
    );
}

