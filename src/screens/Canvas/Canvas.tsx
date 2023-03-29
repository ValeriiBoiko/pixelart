import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { TRootStackParamsList } from "@navigation/RootNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { Routes } from "@navigation/routes";
import { FC } from "react";

type TCanvasProps = StackScreenProps<TRootStackParamsList, Routes.CANVAS>;

const Canvas: FC<TCanvasProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text onPress={() => {
                navigation.goBack()
            }}>Canvas</Text>
        </SafeAreaView>
    )
}

export default Canvas;