import React, { useMemo } from "react";
import useResponsive from '../hooks/useResponsive';
import Theme from '../theme';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from "react-native";

export default function DetailsScreen() {
    const { wp, hp, rf, rem, isTablet } = useResponsive();

    const dynamicStyles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: wp(isTablet ? 4 : 6),
            paddingVertical: hp(isTablet ? 1 : 2),
        },
        backgroundImage: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            width: '100%',
            height: '100%',
        },
        contentContainer: {
            width: '100%',
            height: isTablet ? '50%' : '40%',
            alignItems: "center",
            marginBottom: wp(isTablet ? 100 : 200),
            justifyContent: "flex-start",
        },
        logo: {
            width: wp(isTablet ? 30 : 50),
            height: wp(isTablet ? 30 : 50),
            resizeMode: "contain",
            overflow: "hidden",
        },
        title: {
            fontSize: rem(isTablet ? 30 : 40),
            fontWeight: "bold",
            color: Theme.colors.accent,
            textAlign: "center",
            marginBottom: hp(isTablet ? 1 : 1.5),
        },
        descriptionContainer: {
            width: '100%',
            paddingHorizontal: wp(isTablet ? 1 : 1.5)
        },
        description: {
            fontSize: rem(isTablet ? 12 : 15),
            color: Theme.colors.textDark,
            marginBottom: hp(isTablet ? 1.5 : 2),
            fontWeight: "bold",
            textAlign: "start",
        },
        bold: {
            fontWeight: "bold",
            color: Theme.colors.primary,
        },
    }), [wp, hp, rf, isTablet]);

    return (
        <ImageBackground source={require("../assets/FONDO-INICIO.png")} style={dynamicStyles.backgroundImage}>
            <ScrollView contentContainerStyle={dynamicStyles.container}>
                <View style={dynamicStyles.contentContainer}>
                    <Image source={require("../assets/logo-siloroll.png")} style={dynamicStyles.logo} />
                    <Text style={dynamicStyles.title}>Bienvenido a SiloRoll</Text>
                    <View style={dynamicStyles.descriptionContainer}>
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
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}
