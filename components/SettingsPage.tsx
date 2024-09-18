import React from 'react';
import { View, Text, StyleSheet, Image, Share, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';
import DataJson from '../app.json';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';

function Settings() {
  const [notificationEnabled, setNotificationEnabled] = React.useState(false);
  const [gpsEnabled, setGpsEnabled] = React.useState(false);
  const [fileAccessEnabled, setFileAccessEnabled] = React.useState(false);

  const navigation = useNavigation();

  const onShare = async () => {
    const shareOptions = {
      title: '¡Descubre esta aplicación!',
      message: `¡Hola! He estado usando esta aplicación y me ha parecido genial. Quiero mostrártela para que tú también la pruebes.

      🔹 Características:
      - Funcionalidad impresionante
      - Diseño atractivo
      - ¡Y mucho más!

      Descárgala y pruébala hoy mismo. Aquí está el enlace para que la veas: https://imgur.com/a/rrrbPBp`,
      url: 'https://imgur.com/a/rrrbPBp',
    };

    try {
      await Share.share(shareOptions);
    } catch (error: any) {
      console.log('Error al compartir: ', error.message);
    }
  };

  const handleClearCache = async () => {
    try {
      const cacheDirectory = FileSystem.cacheDirectory; 
      if (cacheDirectory) {
        const files = await FileSystem.readDirectoryAsync(cacheDirectory);
        await Promise.all(files.map(file => FileSystem.deleteAsync(`${cacheDirectory}${file}`)));
        Alert.alert('Caché Borrada', 'La caché de la aplicación ha sido borrada.');
      } else {
        Alert.alert('Error', 'El directorio de caché no está disponible.');
      }
    } catch (error) {
      console.log('Error al borrar la caché: ', error);
      Alert.alert('Error', 'No se pudo borrar la caché.');
    }
  };

  const handleResetPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Alert.alert('Permisos Restablecidos', 'Todos los permisos han sido restablecidos.');
      } else {
        Alert.alert('Permisos', 'No tienes permisos de ubicación para restablecer.');
      }
    } catch (error) {
      console.log('Error al restablecer permisos: ', error);
      Alert.alert('Error', 'No se pudieron restablecer los permisos.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Image style={styles.logo} source={require('../assets/banner.png')} />
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <MaterialIcons name="share" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Ajustes</Text>
          <View style={styles.settingItem}>
            <Text style={styles.label}>Permitir notificaciones</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationEnabled ? '#f5dd4b' : '#f4f3f4'} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.label}>Permisos de GPS</Text>
            <Switch
              value={gpsEnabled}
              onValueChange={setGpsEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={gpsEnabled ? '#f5dd4b' : '#f4f3f4'} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.label}>Permisos de acceso a archivos</Text>
            <Switch
              value={fileAccessEnabled}
              onValueChange={setFileAccessEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={fileAccessEnabled ? '#f5dd4b' : '#f4f3f4'} />
          </View>
        </View>

        <Text style={styles.sectionHeader}>Zona de peligro</Text>
        <View style={[styles.section, styles.dangerSection]}>
          <TouchableOpacity style={styles.dangerButton} onPress={handleClearCache}>
            <Text style={styles.dangerButtonText}>Borrar caché</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dangerButton} onPress={handleResetPermissions}>
            <Text style={styles.dangerButtonText}>Restablecer permisos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Información</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Versión de la app:</Text>
            <Text style={styles.infoValue}>{DataJson.expo.version}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Datos del desarrollador:</Text>
            <Text style={styles.infoValue}>Owell Andry</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  logoContainer: {
    marginVertical: 40,
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  logo: {
    width: '100%',
    height: 200,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
  },
  dangerSection: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: '#ffdddd',
    borderRadius: 15,
  },
  dangerButton: {
    paddingVertical: 15,
    backgroundColor: '#ff4d4d',
    marginVertical: 5,
    borderRadius: 5,
  },
  dangerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
  },
});

export default Settings;
