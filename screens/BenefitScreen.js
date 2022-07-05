import {View, StyleSheet, Text, Pressable, Button} from "react-native";
import COLORS from "../constants/colors";
import data from "../server/db.json";


export default function BenefitScreen({route, navigation}) {

    const benefitId = route.params.benefitId;
    const benefit = data.benefits.find(b => b.id === benefitId);

    return <View style={styles.container}>
        <View style={styles.info}>
            <Text>{benefit.title}</Text>
            <Text>{benefit.id}</Text>
            <Text>{benefit.discount}</Text>
        </View>
        <Button title={"Назад"} onPress={() => navigation.goBack()}/>
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
    },
    info: {
        marginBottom: 20,
    },
});

