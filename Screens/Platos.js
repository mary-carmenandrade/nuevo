import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

const PlatosScreen = () => {
    const [platos, setPlatos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await axios.get('http://192.168.132.117:3000/api/platos');
                setPlatos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response); // Muestra detalles adicionales del error
            }
        };

        fetchPlatos();
    }, []);

    const renderPlatoItem = ({ item }) => (
        <View style={styles.box}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.imagen }} style={styles.image} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Nombre:</Text>
                <Text style={styles.infoText}>{item.nombre}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Puntuación:</Text>
                <Text style={styles.infoText}>{item.puntuacion}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Descripción:</Text>
                <Text style={styles.infoText}>{item.descripcion}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Precio:</Text>
                <Text style={styles.infoText}>{item.precio}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Tipo:</Text>
                <Text style={styles.infoText}>{item.tipo}</Text>
            </View>
        </View>
    );

    const filteredPlatos = platos.filter(
        (plato) =>
            plato.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plato.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>SISTEMA DE RECOMENDACIONES DOÑA MERRY</Text>
                <Image source={{ uri: 'https://img.freepik.com/fotos-premium/mujer-gorro-chef-posando-foto_871710-18087.jpg?w=740' }} style={styles.welcomeImage} />
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre o descripción"
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
            />

            <FlatList
                data={filteredPlatos}
                keyExtractor={(item) => item._id}
                numColumns={3}
                renderItem={renderPlatoItem}
                contentContainerStyle={styles.flatListContainer}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    welcomeContainer: {
        backgroundColor: '#87AB49', // Cambia el color de fondo según tus preferencias
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
    },
    welcomeText: {
        "fontSize": 32,
        "fontWeight": "bold",
        "textAlign": "center",
        "color": "#625E5B" // Elimina el espacio en blanco al final de la cadena de color
    },
    welcomeImage: {
        width: '100%',
        height: 400, // Ajusta la altura de la imagen según tus preferencias
        resizeMode: 'cover',
        borderRadius: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    box: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    imageContainer: {
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    flatListContainer: {
        flex: 1,
    },
    infoContainer: {
        marginBottom: 8,
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#548C7E', // Cambia el color según tus preferencias
    },
    infoText: {
        fontSize: 14,
    },
});

export default PlatosScreen;
