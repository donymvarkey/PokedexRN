import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { COLORS } from './src/constants/colors';
import Routes from './src/Routes';
import Container from './src/components/Container';


function App(): React.JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
}

export default App;
