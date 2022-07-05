import React from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text, Pressable, Dimensions} from "react-native";
import createImagePath from "../../services/createImagePath";
import COLORS from "../../constants/colors";
import {navigate} from "../../navigation/RootNavigation";

const {width, height} = Dimensions.get("window");

export default function CategoriesListItem({item, isNoveltiesItem}) {
    const imageSource = createImagePath(item.img);

    const showDetailsHandler = () => {
        navigate("Benefit", {benefitId: item.id});
    }

    return (
        <Pressable style={[styles.card, isNoveltiesItem ? {width: width / 1.2} : null]} onPress={showDetailsHandler}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode={"cover"}
                       source={imageSource}/>
                <Text style={[styles.discount, isNoveltiesItem ? {top: '85%'} : null]}>{item.discount}</Text>
            </View>
            {!isNoveltiesItem && <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
            </View>}
        </Pressable>)
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: width / 1.5,
        minHeight: height / 4,
        marginLeft: 10,
        paddingTop: 10,
        paddingHorizontal: 5,
    },
    imageContainer: {
        position: "relative",
        overflow: "hidden",
        flex: 5,
        width: "100%",
        height: "90%",
        borderRadius: 20,
        elevation: 8,
        shadowRadius: 8,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowColor: "black"
    },
    image: {
        height: "100%",
        width: "100%",
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        color: COLORS.primary,
        opacity: 0.5,
        fontSize: 12,
        fontWeight: "bold",
    },
    discount: {
        position: "absolute",
        top: "75%",
        left: "5%",
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 20,
        color: COLORS.primary,
        backgroundColor: COLORS.secondary,
        textAlign: "center",
        fontWeight: "700"
    }
})

