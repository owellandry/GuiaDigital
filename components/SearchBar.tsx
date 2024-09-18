import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SearchBar: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Icon name="search" size={20} color="#555" style={styles.icon} />
            <TextInput style={styles.input} placeholder="Buscar ubicación..." placeholderTextColor="#888" />
            <Icon
                name="settings"
                size={20}
                color="#555"
                style={styles.icon}
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      position: 'absolute',
      top: 50,
      left: 15,
      right: 15,
      elevation: 3, // Sombra para Android
      shadowColor: '#000', // Sombra para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    icon: {
      margin: 10,
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
    },
  });

export default SearchBar;
