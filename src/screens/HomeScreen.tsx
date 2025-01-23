import {View, Text, FlatList, Image, Pressable, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {HEIGHT, WIDTH} from '../constants/dimensions';
import {getPokemonList, searchPokemonFromApi} from '../utils';
import PokemonItem from '../components/PokemonItem';
import {COLORS} from '../constants/colors';
import {close, pokedexLogo, search} from '../assets';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [pokemonList, setPokemonList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [offset, setOffset] = useState(0);
  const [text, setText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getPokemonListFromApi();
  }, [offset]);

  const searchPokemon = async () => {
    try {
      const data = await searchPokemonFromApi(text);
      setShowSearch(false);
      navigation.navigate('PokemonDetails', {id: data?.id});
    } catch (error) {
      console.log('error -->', error);
    }
  };

  const getPokemonListFromApi = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await getPokemonList(offset);
      setPokemonList(
        offset === 0
          ? apiResponse?.results
          : [...pokemonList, ...apiResponse?.results],
      );
      setIsLoading(false);
    } catch (error) {
      console.log('error -->', error);
    }
  };
  return (
    <Container>
      <View
        style={{
          height: HEIGHT * 0.88,
          width: WIDTH,
          justifyContent: 'center',
          marginTop: HEIGHT * 0.08,
          paddingTop: HEIGHT * 0.01,
          paddingHorizontal: WIDTH * 0.05,
        }}>
        <Image
          source={pokedexLogo}
          style={{width: WIDTH, height: HEIGHT * 0.1, alignSelf: 'center'}}
          resizeMode="contain"
        />
        <FlatList
          data={pokemonList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{height: HEIGHT * 0.03}} />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            setOffset(prevState => prevState + 1);
          }}
          renderItem={({item}) => <PokemonItem {...item} />}
        />
      </View>
      <Pressable
        onPress={() => setShowSearch(true)}
        style={{
          position: 'absolute',
          bottom: HEIGHT * 0.02,
          right: WIDTH * 0.06,
          backgroundColor: COLORS.accent,
          padding: WIDTH * 0.04,
          borderRadius: (WIDTH * 0.2) / 2,
        }}>
        <Image
          style={{height: WIDTH * 0.08, width: WIDTH * 0.08}}
          source={search}
          tintColor={COLORS.secondary}
        />
      </Pressable>
      <View>
        <Modal
          isVisible={showSearch}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <View
            style={{
              borderRadius: WIDTH * 0.03,
              backgroundColor: '#fff',
              //   height: HEIGHT * 0.4,
              paddingHorizontal: WIDTH * 0.02,
              paddingVertical: WIDTH * 0.03,
            }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{fontSize: 18, color: COLORS.text, fontWeight: '500'}}>
                Search Pokemon
              </Text>
              <Pressable onPress={() => setShowSearch(false)} style={{}}>
                <Image
                  source={close}
                  style={{width: WIDTH * 0.08, height: WIDTH * 0.08}}
                />
              </Pressable>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: `${COLORS.text}40`,
                paddingHorizontal: WIDTH * 0.035,
                paddingVertical: HEIGHT * 0.015,
                marginTop: HEIGHT * 0.02,
                borderRadius: WIDTH * 0.02,
              }}>
              <TextInput
                style={{fontSize: 18, color: COLORS.text}}
                placeholder="Pokemon Name"
                onChangeText={text => setText(text)}
              />
            </View>
            <Pressable
              onPress={searchPokemon}
              style={{
                backgroundColor: COLORS.primary,
                paddingHorizontal: WIDTH * 0.035,
                paddingVertical: HEIGHT * 0.015,
                borderRadius: WIDTH * 0.02,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: HEIGHT * 0.01,
              }}>
              <Text style={{fontSize: 18}}>Search</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </Container>
  );
};

export default HomeScreen;
