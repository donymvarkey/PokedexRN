import {View, Text, Pressable, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {HEIGHT, WIDTH} from '../constants/dimensions';
import {heartFilled, heartOutline, leftArrow} from '../assets';
import {COLORS, STAT_STRINGS} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {addToFavorites, getPokemonDetails, getPokemonImage} from '../utils';
import Type from '../components/Type';
import Loader from '../components/Loader';

const PokemonDetailsScreen = ({route}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState({});
  useEffect(() => {
    getPokemonDetailsFromApi();
  }, []);
  const getPokemonDetailsFromApi = async () => {
    setIsLoading(true);
    const apiResponse = await getPokemonDetails(route?.params?.id);
    setPokemonDetails(apiResponse);
    setIsLoading(false);
  };

  const handleAddToFavorites = async () => {
    const pokemonObj = {
      name: pokemonDetails?.name,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonDetails?.id}`,
    };

    await addToFavorites(pokemonObj);
  };
  return (
    <Container>
      {isLoading && <Loader />}
      <View
        style={{
          height: HEIGHT,
          width: WIDTH,
          paddingTop: HEIGHT * 0.08,
          paddingHorizontal: WIDTH * 0.05,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={leftArrow}
            style={{width: WIDTH * 0.08, height: WIDTH * 0.06}}
            tintColor={COLORS.text}
          />
        </Pressable>
        <View
          style={{
            width: '100%',
            backgroundColor: `${COLORS.text}40`,
            height: HEIGHT * 0.8,
            marginTop: HEIGHT * 0.03,
            borderRadius: 10,
          }}>
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: COLORS.secondary,
              borderRadius: 8,
              top: -HEIGHT * 0.007,
              left: -HEIGHT * 0.0065,
              alignItems: 'center',
            }}>
            <ScrollView
              contentContainerStyle={{paddingBottom: HEIGHT * 0.02}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  position: 'absolute',
                  alignSelf: 'flex-start',
                  paddingHorizontal: WIDTH * 0.02,
                  paddingVertical: HEIGHT * 0.004,
                  top: WIDTH * 0.02,
                  left: WIDTH * 0.02,
                  borderRadius: 10,
                }}>
                <Text
                  style={{color: COLORS.text, fontSize: 16, fontWeight: '700'}}>
                  #{route?.params?.id}
                </Text>
              </View>
              <Pressable
                onPress={handleAddToFavorites}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: HEIGHT * 0.01,
                  marginRight: WIDTH * 0.02,
                }}>
                {/* <Image
                  style={{width: WIDTH * 0.08, height: WIDTH * 0.08}}
                  source={isFavorite ? heartFilled : heartOutline}
                  tintColor={isFavorite && COLORS.primary}
                /> */}
              </Pressable>
              <Image
                style={{
                  width: WIDTH * 0.7,
                  height: WIDTH * 0.6,
                  alignSelf: 'center',
                  zIndex: 10,
                }}
                resizeMode="contain"
                source={{uri: getPokemonImage(route?.params?.id)}}
              />
              <View style={{marginTop: HEIGHT * 0.03, alignItems: 'center'}}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontSize: WIDTH * 0.1,
                    fontWeight: '600',
                    color: COLORS.text,
                  }}>
                  {pokemonDetails?.name}
                </Text>
              </View>
              <View
                style={{
                  marginStart: WIDTH * 0.02,
                  flexDirection: 'row',
                  columnGap: WIDTH * 0.01,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: HEIGHT * 0.004,
                }}>
                {pokemonDetails?.types?.map(type => (
                  <Type key={type?.slot} name={type?.type?.name} />
                ))}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: WIDTH * 0.05,
                  marginTop: HEIGHT * 0.02,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: COLORS.text,
                      }}>
                      {pokemonDetails?.base_experience}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: `${COLORS.text}30`,
                    }}>
                    Base Experience
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: COLORS.text,
                      }}>
                      {pokemonDetails?.height}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: `${COLORS.text}50`,
                      }}>
                      m
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: `${COLORS.text}30`,
                    }}>
                    Height
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: COLORS.text,
                      }}>
                      {pokemonDetails?.weight}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: `${COLORS.text}50`,
                      }}>
                      kg
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: `${COLORS.text}30`,
                    }}>
                    Weight
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: WIDTH * 0.05,
                  marginTop: HEIGHT * 0.02,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: `${COLORS.text}40`,
                    marginBottom: HEIGHT * 0.008,
                  }}>
                  Stats
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: `${COLORS.text}20`,
                    marginBottom: HEIGHT * 0.008,
                  }}
                />
                {pokemonDetails?.stats?.map((stat, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: HEIGHT * 0.004,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: `${COLORS.text}80`,
                      }}>
                      {STAT_STRINGS[stat?.stat?.name]}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: `${COLORS.text}`,
                      }}>
                      {stat?.base_stat}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default PokemonDetailsScreen;
