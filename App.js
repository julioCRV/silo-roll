import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

// Screens
import Tienda from './Screen/Tienda';
import Inicio from './Screen/Inicio';
import Presentacion from './Screen/InicioPresentacion';

// Crear los navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegador de pila para la pestaña de Restaurantes
function RestaurantesStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tienda"
        component={Tienda}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Navegador principal de pestañas
function MainContainer() {
  const [showPresentacion, setShowPresentacion] = useState(true);

  const handlePress = () => {
    setShowPresentacion(false); // Cambia el estado al presionar
  };

  return (
    <NavigationContainer>
      {showPresentacion ? (
        <Presentacion onPress={handlePress} />
      ) : (
        <Tab.Navigator
          initialRouteName="Inicio"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Inicio') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Tienda') {
                iconName = focused ? 'storefront' : 'storefront-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0DF205',
            tabBarInactiveTintColor: '#56A632',
            tabBarLabelStyle: { paddingBottom: 10, fontSize: 14 },
            tabBarStyle: { padding: 10, height: 70, backgroundColor: '#737373' },
            tabBarButton: (props) => {
              const { children, onPress, accessibilityState } = props;
              const isSelected = accessibilityState.selected;

              return (
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSelected ? '#0B0B0D' : 'transparent',
                    borderTopLeftRadius: isSelected && route.name === 'Inicio' ? 28 : 0,
                    borderBottomLeftRadius: isSelected && route.name === 'Inicio' ? 28 : 0,
                    borderTopRightRadius: isSelected && route.name === 'Tienda' ? 28 : 0,
                    borderBottomRightRadius: isSelected && route.name === 'Tienda' ? 28 : 0,
                  }}
                >
                  {children}
                </TouchableOpacity>

              );
            },
          })}
        >
          <Tab.Screen name="Tienda" component={RestaurantesStack} options={{ headerShown: false }} />
          <Tab.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default MainContainer;
