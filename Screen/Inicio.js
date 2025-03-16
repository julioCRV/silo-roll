import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>
                INICIO
            </Text>
            <Text style={styles.description}>
                SiloRoll es un proceso de Empaquetamiento de Ensilaje con alta Densidad en su contenido Sellandolo
                con una Malla elastica que se coloca alrededor del Rollo y finalmente clausurando todas sus entradas
                de aire con un Film Strech que deja blindado el contenido interior aislandolo de la influencia
                ambiente para estabilizar todos sus nutrientes y asi permanecer el tiempo de almacenamiento requerido...
            </Text>
            <Text style={styles.description}>
            Nuestra misión es atender las exigencias nutricionales del sector ganadero boliviano con alimentos de 
            excelente calidad producidos a tiempo con los mejores controles para llegar a tener disponibles en los 
            tiempos precisos y oportunos un alimento que cumpla con los estándares requeridos para todo productor 
            que se haya comprometido en atender el mercado alimentario
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
