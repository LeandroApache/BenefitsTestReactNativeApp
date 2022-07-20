import React, {useContext} from "react";
import {Image, StyleSheet, TouchableOpacity, View, Text, Pressable, Dimensions} from "react-native";
import createImagePath from "../../services/createImagePath";
import COLORS from "../../constants/colors";
import {navigate} from "../../navigation/RootNavigation";
import DiscountLabel from "../DiscountLabel";
import {RootContext} from "../../store";
import {AntDesign} from "@expo/vector-icons";

const {width, height} = Dimensions.get("window");

export default function CategoriesListItem({item, isNoveltiesItem}) {
    const {ids} = useContext(RootContext);

    const imageSource = createImagePath(item.img);

    const isItemFavorite = ids.includes(item.id);

    const showDetailsHandler = () => {
        navigate("Benefit", {benefitId: item.id});
    }

    return (
        <Pressable style={[styles.card, isNoveltiesItem ? {width: width / 1.2} : null]} onPress={showDetailsHandler}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode={"cover"}
                       source={imageSource}/>
                <DiscountLabel>{item.discount}</DiscountLabel>
                {isItemFavorite &&
                <View style={styles.favoriteIconContainer}>
                    <AntDesign name={'heart'} size={20}
                               color={COLORS.activeLink}/>
                </View>}
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
        color: COLORS.primaryText,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "main-bold"
    },
    favoriteIconContainer: {
        position: "absolute",
        top: 12,
        right: 12,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
    }
})

