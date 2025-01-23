import { View, Text } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/dimensions'
import { COLORS, TYPES, dark } from '../constants/colors'

const Type = ({ name }) => {
    return (
        <View style={{ backgroundColor: `${TYPES[name]}`, paddingHorizontal: WIDTH * 0.02, borderRadius: 8, paddingVertical: HEIGHT * 0.005 }}>
            <Text style={[dark.includes(name) ? { color: COLORS.secondary } : { color: COLORS.text }, { textTransform: 'capitalize', fontSize: 14, fontWeight: '500' }]}>{name}</Text>
        </View>
    )
}

export default Type