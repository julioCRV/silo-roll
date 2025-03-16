import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>
        INICIO
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#737373',
    },

    logo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
        // Efecto de sombra para el logo
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        shadowRadius: 5, // Difuminado de la sombra
        elevation: 5, // Elevación para Android
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30
    },
});
