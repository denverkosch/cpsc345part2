import { HistoryPage } from './history.js';
import { EncryptPage } from './encryptPage.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store';
import { ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { DetailsPage } from './detailPage.js';

const persistor= persistStore(store)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store ={store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={EncryptPage} options={{title: 'Encrypt / Decrypt'}}/>

            <Stack.Screen name="History" component={HistoryPage} options={{title: 'History'}}/>
            <Stack.Screen name="Details" component={DetailsPage} options={{title: 'Details'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}