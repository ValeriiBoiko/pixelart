import { FC } from "react";
import { Text } from "react-native";
import { Routes } from "@navigation/routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { TRootStackParamsList } from "@navigation/RootNavigator";

type THomeProps = StackScreenProps<TRootStackParamsList, Routes.HOME>

const Home: FC<THomeProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text onPress={() => {
                navigation.navigate(Routes.CANVAS)
            }}>Home</Text>
        </SafeAreaView>
    )
}

export default Home;