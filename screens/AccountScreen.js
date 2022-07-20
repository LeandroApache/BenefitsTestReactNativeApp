import {View, StyleSheet, Text, Pressable, Button} from "react-native";
import COLORS from "../constants/colors";
import data from "../server/db.json";


export default function AccountScreen({route, navigation}) {

    return <View style={styles.container}>
            <Text>User account</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        paddingTop: 30,
        backgroundColor: COLORS.background,
    }
});

