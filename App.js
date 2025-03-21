import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from './theme';
import useResponsive from './hooks/useResponsive';

// Screens
import Tienda from './Screen/Tienda';
import Inicio from './Screen/Inicio';
import Presentacion from './Screen/InicioPresentacion';

// Crear los navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegador de pila para Tienda
function TiendaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TiendaScreen"  // Nombre único corregido
        component={Tienda}
      />
    </Stack.Navigator>
  );
}

// Navegador principal de pestañas
function MainContainer() {
  const { wp, hp, rem } = useResponsive();
  const [showPresentacion, setShowPresentacion] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIfPresented = async () => {
      try {
        const hasPresented = await AsyncStorage.getItem('hasPresented');
        let timeout;
  
        if (hasPresented !== 'true') {
          // Mostrar por mínimo 2 segundos aunque el usuario toque antes
          timeout = setTimeout(() => {
            setShowPresentacion(false);
          }, 7000);
        }
  
        if (hasPresented === 'true') {
          setShowPresentacion(false);
        }
        
        return () => clearTimeout(timeout);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    checkIfPresented();
  }, []);

  const handlePresentationEnd = async () => {
    try {
      await AsyncStorage.setItem('hasPresented', 'true');
    } catch (error) {
      console.error('Failed to save presentation state', error);
    }
    setShowPresentacion(false);
  };

  if (isLoading) {
    //return null; // or a loading spinner
    return <ActivityIndicator />;
  }

  // Estilos responsivos
  const tabBarStyles = {
    activeTint: Theme.colors.secondary,
    inactiveTint: Theme.colors.primary,
    labelStyle: {
      paddingTop: Theme.spacing.xs,
      paddingBottom: Theme.spacing.sm,
      fontSize: rem(Theme.typography.caption)
    },
    tabBarStyle: {
      height: hp(9),
      backgroundColor: Theme.colors.neutralLight,
      borderTopWidth: 1,
      borderTopColor: Theme.colors.neutralDark,
    }
  };

  const getTabBarButtonStyles = (isSelected, routeName) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isSelected ? Theme.colors.neutralDark : 'transparent',

    borderRadius: wp(2), // Valor responsivo general
    ...(routeName === 'Inicio' && {
      borderTopLeftRadius: wp(7),
      borderBottomLeftRadius: wp(7)
    }),
    ...(routeName === 'Tienda' && {
      borderTopRightRadius: wp(7),
      borderBottomRightRadius: wp(7)
    })
  });

  const renderTabBarIcon = (routeName, focused) => {
    const iconSize = wp(6);
    const icons = {
      //Inicio: focused ? 'home' : 'home-outline',
      Inicio: focused ? 'home' : 'home',
      //Tienda: focused ? 'storefront' : 'storefront-outline'
      Tienda: focused ? 'storefront' : 'storefront',
    };
    return (
      <Ionicons 
        name={icons[routeName]} 
        size={iconSize}
        color={focused ? tabBarStyles.activeTint : tabBarStyles.inactiveTint}
      />
    );
  };

  return (
    <NavigationContainer>
      {showPresentacion ? (
        <Presentacion onPress={handlePresentationEnd} />
      ) : (
        <Tab.Navigator
          initialRouteName="Inicio"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => renderTabBarIcon(route.name, focused),
            tabBarActiveTintColor: tabBarStyles.activeTint,
            tabBarInactiveTintColor: tabBarStyles.inactiveTint,
            tabBarLabelStyle: tabBarStyles.labelStyle,
            tabBarStyle: tabBarStyles.tabBarStyle,
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                accessibilityRole="button"
                accessibilityLabel={route.name}
                accessibilityState={{ selected: props.accessibilityState.selected }}
                style={getTabBarButtonStyles(
                  props.accessibilityState.selected,
                  route.name
                )}
              />
            )
          })}
        >
          <Tab.Screen 
            name="Inicio" 
            component={Inicio} 
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Tienda" 
            component={TiendaStack}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default MainContainer;