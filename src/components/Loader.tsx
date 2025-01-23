import { View, Text, Image, Easing, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/dimensions'
import { COLORS } from '../constants/colors'
import { pokeball } from '../assets'

const Loader = () => {
    const rotationAnim = useRef(new Animated.Value(0)).current
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
    }, [])

    // Interpolate the rotation value for transforming the image
    const interpolatedRotateAnimation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });
    return (
        <View style={{ width: WIDTH, height: HEIGHT, backgroundColor: `${COLORS.text}80`, alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center', zIndex: 20 }}>
            <Animated.Image style={{ width: WIDTH * 0.4, height: WIDTH * 0.4, transform: [{ rotate: interpolatedRotateAnimation }] }} source={pokeball} />
        </View>
    )
}

export default Loader