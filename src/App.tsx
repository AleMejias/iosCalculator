import {
  StatusBar,
  View,
} from 'react-native';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { globalStyles } from './presentation/config/theme/app.theme';

export const  App = () => {
  return (
    <View style={ globalStyles.background }>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreen />
    </View>
  );
}


export default App;
