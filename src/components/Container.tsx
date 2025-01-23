import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/colors'
import { HEIGHT, WIDTH } from '../constants/dimensions'

const Container = ({ children }) => {
    return (
        <View style={{ height: HEIGHT, width: WIDTH, backgroundColor: COLORS.primary }}>
            <StatusBar
                barStyle={'dark-content'}
            />
            <View>
                {children}
            </View>
        </View>
    )
}

export default Container