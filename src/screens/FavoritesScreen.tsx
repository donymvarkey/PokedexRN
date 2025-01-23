import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../components/Container'
import { HEIGHT, WIDTH } from '../constants/dimensions'
import { getFavoritesList } from '../utils'

const FavoritesScreen = () => {

    useEffect(() => {
        getFavourites()
    }, [])

    const getFavourites = async () => {
        const data = await getFavoritesList()
        console.log("🚀 ~ getFavourites ~ data:", data)
    }
    return (
        <Container>
            <View style={{ width: WIDTH, height: HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                <Text>FavoritesScreen</Text>
            </View>
        </Container>
    )
}

export default FavoritesScreen