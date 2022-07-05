import React, {useContext} from "react";
import {StyleSheet, View, Text, Pressable, Dimensions} from "react-native";
import COLORS from "../../constants/colors";
import {navigate} from "../../navigation/RootNavigation";
import {RootContext} from "../../store";

const {width, height} = Dimensions.get("window");

export default function CategoriesListPlaceholder({num, title, categoryId}) {
    const {changeCategory} = useContext(RootContext);


    const showDetailsHandler = () => {
        navigate("CategoryOverview", {categoryId: categoryId, title});
        changeCategory(Number(categoryId));
    }

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Pressable style={styles.button}  android_ripple={{color: COLORS.backgroundDark}}
                            onPress={showDetailsHandler}>
                    <Text style={[styles.link]}>{`Смотреть еще ${num}`}</Text>
                </Pressable>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: width / 2,
        minHeight: height / 4,
        marginLeft: 10,
        paddingTop: 10,
        paddingHorizontal: 5,
        overflow: "hidden",
    },
    imageContainer: {
        width: "100%",
        height: "77%",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.backgroundDark,
        backgroundColor: COLORS.background,
        elevation: 4,
        shadowRadius: 8,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowColor: "black",
        overflow: "hidden"
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    link: {
        paddingHorizontal: 20,
        textAlign: "center"
    },
})

