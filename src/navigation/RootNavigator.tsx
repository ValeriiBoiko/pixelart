import { NavigationContainer } from '@react-navigation/native';
import Canvas from '@screens/Canvas';
import Home from '@screens/Home';
import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Routes } from './routes';

export type TRootStackParamsList = {
    [Routes.HOME]: undefined,
    [Routes.CANVAS]: undefined,
}

const Stack = createSharedElementStackNavigator<TRootStackParamsList>();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={Routes.HOME} component={Home} />
                <Stack.Screen name={Routes.CANVAS} component={Canvas} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;
