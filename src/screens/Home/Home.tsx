import { FC, useCallback } from 'react';
import { Routes } from '@navigation/routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootStackParamsList } from '@navigation/RootNavigator';
import useStyles from '@hooks/useStyles';
import getHomeStyles from './HomeStyles';
import EmptyScreenPlaceholder from './EmptyScreenPlaceholder';

type THomeProps = StackScreenProps<TRootStackParamsList, Routes.HOME>;

const Home: FC<THomeProps> = ({ navigation }) => {
  const { styles } = useStyles(getHomeStyles);

  const onPressAddArt = useCallback(() => {
    navigation.navigate(Routes.CANVAS);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <EmptyScreenPlaceholder onPress={onPressAddArt} />
    </SafeAreaView>
  );
};

export default Home;
