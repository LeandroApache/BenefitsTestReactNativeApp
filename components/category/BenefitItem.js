import {Text, View, StyleSheet, Pressable, Image, Dimensions, Animated, Button} from "react-native";
import createImagePath from "../../services/createImagePath";
import COLORS from "../../constants/colors";
import {navigate} from "../../navigation/RootNavigation";
import React, {useContext} from "react";
import {RootContext} from "../../store";
import {AntDesign} from '@expo/vector-icons';
import DiscountLabel from "../DiscountLabel";

const {width, height} = Dimensions.get("window");

export default function BenefitItem({item, scale, opacity}) {

    const rootCtx = useContext(RootContext);


    const imagePath = createImagePath(item.img);

    const benefitIsFavorite = rootCtx.ids.includes(item.id);

    const showDetailsHandler = () => {
        navigate("Benefit", {benefitId: item.id});
    }

    const changeFavoriteStatusHandler = () => {
        if (benefitIsFavorite) {
            rootCtx.removeFromFavorites(item.id);
        } else {
            rootCtx.addToFavorites(item.id);
        }
    }

    return <Animated.View style={[styles.itemContainer, {transform: [{scale}], opacity}]}>
        <Pressable onPress={showDetailsHandler} style={{flex: 1}}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={imagePath}/>
                <DiscountLabel style={styles.discount}>{item.discount}</DiscountLabel>
                <Pressable onPress={changeFavoriteStatusHandler} style={styles.favoriteIconContainer}>
                    <AntDesign name={benefitIsFavorite ? 'heart' : 'hearto'} size={20}
                               color={benefitIsFavorite ? COLORS.activeLink : COLORS.primaryText}/>
                </Pressable>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                    consectetur doloribus eius
                    fugit itaque, magni quis sunt ullam.</Text>
            </View>
        </Pressable>
    </Animated.View>
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        // width: "100%",
        height: height / 3,
        marginBottom: 32,
        marginLeft: 10,
        paddingTop: 10,
        paddingHorizontal: 5,
    },
    button: {
        flex: 1
    },
    imageContainer: {
        position: "relative",
        overflow: "hidden",
        flex: 5,
        width: "100%",
        height: "90%",
        borderRadius: 20,
        elevation: 6,
        shadowRadius: 8,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowColor: "black",
        marginBottom: 16
    },
    image: {
        width: "100%",
        height: "100%"
    },
    titleContainer: {
        flex: 1,
        marginTop: 8,
        justifyContent: "center"
    },
    title: {
        marginBottom: 4,
        color: COLORS.primaryText,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: "main-bold"
    },
    desc: {
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 20,
        color: "#989BB3"
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
});


