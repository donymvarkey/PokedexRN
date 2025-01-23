import { View, Text, StatusBar, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/colors'
import Container from '../components/Container'
import { HEIGHT, WIDTH } from '../constants/dimensions'
import { useNavigation } from '@react-navigation/native'
import { pokeball, pokedexLogo } from '../assets'

const SplashScreen = () => {
    const navigation = useNavigation()
    const [bounceAnim] = useState(new Animated.Value(0));
    const rotationAnim = useRef(new Animated.Value(0)).current
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [bounceAnim]);
    const rotateImage = () => {
        Animated.loop(
            Animated.timing(
                rotationAnim,
                {
                    toValue: 1, // Rotate to 1 (360 degrees)
                    duration: 1000, // Animation duration
                    easing: Easing.linear, // Easing function
                    useNativeDriver: true // Use native driver for better performance
                }
            )
        ).start();
    };
    useEffect(() => {
        rotateImage()
        fadeIn()
        setTimeout(() => {
            navigation.navigate('HomeScreen')
        }, 2000)
    }, [])

    const ballStyle = {
        transform: [
            {
                translateY: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                }),

            },
            {
                rotate: rotationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                })
            }

        ],
    };
    // useEffect(() => {
    //     setTimeout(() => {
    //         navigation.navigate('Home')
    //     }, 1000)
    // }, [])
    return (
        <Container>
            <View style={{ height: HEIGHT, alignItems: 'center', justifyContent: 'center', }}>
                <Animated.Image style={[{ width: WIDTH * 0.4, height: WIDTH * 0.4 }, ballStyle]} source={pokeball} />
                <Animated.Image style={[{ width: WIDTH * 0.8, height: HEIGHT * 0.1, opacity: fadeAnim }]} source={pokedexLogo} resizeMode='contain' />
            </View>
        </Container>
    )
}

export default SplashScreen