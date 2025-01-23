import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/dimensions'
import { COLORS } from '../constants/colors'
import { heartFilled, heartOutline, homeFilled, homeOutlined, search } from '../assets'
import { useNavigation } from '@react-navigation/native'

const BottomBar = (props) => {
    const navigation = useNavigation()
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <View style={{ paddingHorizontal: WIDTH * 0.05 }}>
            <View style={{
                backgroundColor: COLORS.accent,
                borderRadius: WIDTH * 0.2 / 2,
                flexDirection: 'row',
                paddingHorizontal: WIDTH * 0.08,
                paddingVertical: HEIGHT * 0.02,
                justifyContent: 'space-between',
                position: 'absolute',
                alignSelf: 'center',
                width: '100%',
                bottom: HEIGHT * 0.03
            }}>
                <Pressable style={{
                    alignItems: 'center'
                }} onPress={() => { navigation.navigate('HomeScreen'); setActiveIndex(0) }}>
                    <Image style={{ width: WIDTH * 0.08, height: WIDTH * 0.08 }} source={activeIndex === 0 ? homeFilled : homeOutlined} tintColor={activeIndex === 0 && COLORS.primary} />
                </Pressable>
                <Pressable style={{
                    backgroundColor: COLORS.primary,
                    width: WIDTH * 0.15,
                    height: WIDTH * 0.15,
                    position: 'absolute',
                    left: '47%',
                    top: -HEIGHT * 0.02,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: WIDTH * 0.2 / 2
                }}>
                    <Image style={{ width: WIDTH * 0.08, height: WIDTH * 0.08 }} source={search} />
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('FavoritesScreen'); setActiveIndex(1) }}>
                    <Image style={{ width: WIDTH * 0.08, height: WIDTH * 0.08 }} source={activeIndex === 1 ? heartFilled : heartOutline} tintColor={activeIndex === 1 && COLORS.primary} />
                </Pressable>
            </View>
        </View>
    )
}

export default BottomBar