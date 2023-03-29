import { NavigationContainer, Theme } from '@react-navigation/native';
import Canvas from '@screens/Canvas';
import Home from '@screens/Home';
import colors from '@theme/colors';
import React from 'react';
import { useColorScheme } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Routes } from './routes';

export type TRootStackParamsList = {
    [Routes.HOME]: undefined,
    [Routes.CANVAS]: undefined,
}

const Stack = createSharedElementStackNavigator<TRootStackParamsList>();

const RootNavigator = () => {
    const colorScheme = useColorScheme() || 'light';

    const theme: Theme = {
        dark: colorScheme === 'dark',
        colors: colors[colorScheme]
    }

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator>
                <Stack.Screen name={Routes.HOME} component={Home} />
                <Stack.Screen name={Routes.CANVAS} component={Canvas} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;
