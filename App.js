import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {AddContactScreen, ContactScreen, EditContactScreen} from './src/screen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contact">
          <Stack.Screen
            name="Contact"
            component={ContactScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add"
            component={AddContactScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Edit"
            component={EditContactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
