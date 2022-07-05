import {View, StyleSheet} from "react-native";
import MainContent from "../components/homePage/MainContent";
import data from '../server/db.json';
import COLORS from "../constants/colors";

export default function HomeScreen({}) {
    const products = data.benefits;

    return <View style={styles.container}>
        <MainContent products={products}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    }
})

