import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesScreen, HomeScreen, PokemonDetailsScreen, SplashScreen } from './screens';
import BottomBar from './components/BottomBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => {
                const { state } = props
                return <BottomBar {...props} />
            }}
            screenOptions={{
                headerShown: false
            }}
            detachInactiveScreens={false}
            initialRouteName={"HomeScreen"}
        >
            <Tab.Screen name='HomeScreen' component={HomeScreen} />
            <Tab.Screen name='FavoritesScreen' component={FavoritesScreen} />
        </Tab.Navigator>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen'
                detachInactiveScreens={false}
                screenOptions={{
                    gestureEnabled: false, headerShown: false,
                    cardStyleInterpolator: ({ current: { progress } }) => {
                        return { cardStyle: { opacity: progress, }, };
                    }, transitionSpec: { open: { animation: 'timing', config: { duration: 500 } }, close: { animation: 'timing', config: { duration: 500 } } }
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                {/* <Stack.Screen name="Home" component={BottomTabNavigator} /> */}
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes