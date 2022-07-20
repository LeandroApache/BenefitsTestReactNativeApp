import {View, StyleSheet, Text, Pressable, Button, Image, Dimensions, FlatList} from "react-native";
import COLORS from "../constants/colors";
import data from "../server/db.json";
import {useContext} from "react";
import {RootContext} from "../store";
import BenefitsList from "../components/category/BenefitsList";

const width = Dimensions.get("window").width;

export default function FavoritesScreen({route, navigation}) {

    const {ids} = useContext(RootContext);

    const favoriteBenefits = data.benefits.filter(b => ids.includes(b.id));
    console.log(favoriteBenefits);

    let content;

    if (!ids || ids.length === 0) {
        content = <View style={styles.emptyContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../assets/icons/cards.png")}/>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoTitle}>Нет избранного</Text>
                <Text style={styles.infoText}>Чтобы добавить любимые скидки, просто нажими на иконку 💙️ в
                    карточке</Text>
            </View>
        </View>
    } else {
        content = <View style={styles.container}>
            <Text style={styles.title}>Избранное</Text>
            <BenefitsList items={favoriteBenefits}/>
        </View>
    }

    return content
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        paddingTop: 30,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 30,
        backgroundColor: COLORS.background,
    },
    title: {
        marginVertical: 24,
        marginHorizontal: 16,
        color: COLORS.primaryText,
        fontWeight: "700",
        fontSize: 28,
        lineHeight: 28
    },
    imageContainer: {
        minWidth: 310,
        width: width * 0.8,
        height: 250,
        marginBottom: 20
    },
    image: {
        width: "100%",
        height: "100%",
    },
    info: {
        width: width * 0.8,
    },
    infoTitle: {
        marginBottom: 12,
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 24,
        textAlign: "center",
        color: "#19224C"
    },
    infoText: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
        textAlign: "center",
        color: "#989BB3"
    }
});

