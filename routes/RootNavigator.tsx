import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/HomeScreen';
import Settings from '../components/SettingsPage';
import Favorites from '../components/Favorites';
import Promotions from '../components/Promotions';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Promotions" component={Promotions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
