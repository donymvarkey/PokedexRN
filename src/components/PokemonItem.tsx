import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/dimensions'
import { COLORS } from '../constants/colors'
import { getIdFromUrl, getPokemonImage } from '../utils'
import { useNavigation } from '@react-navigation/native'

const PokemonItem = ({ name, url }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate('PokemonDetails', { id: getIdFromUrl(url) })} style={{
            height: HEIGHT * 0.2,
            borderColor: '#000',
            borderRadius: 10,
            marginStart: WIDTH * 0.02,
            backgroundColor: `${COLORS.text}40`,
            marginTop: HEIGHT * 0.01
        }}>
            <View style={{
                height: HEIGHT * 0.2,
                position: 'absolute',
                backgroundColor: COLORS.secondary,
                flex: 1,
                borderRadius: 7,
                width: '100%',
                top: -HEIGHT * 0.005,
                left: -HEIGHT * 0.005,
            }}>
                <View style={{ backgroundColor: COLORS.error, position: 'absolute', alignSelf: 'flex-start', paddingHorizontal: WIDTH * 0.02, paddingVertical: HEIGHT * 0.004, top: WIDTH * 0.02, left: WIDTH * 0.02, borderRadius: 10 }}>
                    <Text style={{ color: COLORS.secondary, fontSize: 16, fontWeight: '700' }}>#{getIdFromUrl(url)}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: WIDTH * 0.35, height: WIDTH * 0.35 }} resizeMode='contain' source={{ uri: getPokemonImage(getIdFromUrl(url)) }} />
                    <Text style={{ textTransform: 'capitalize', fontSize: 18, fontWeight: '500', color: COLORS.text }}>{name}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default PokemonItem