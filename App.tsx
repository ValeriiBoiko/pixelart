import React, { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <RootNavigator />
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
};

export default App;
