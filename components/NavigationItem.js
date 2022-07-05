import React from "react";
import {Text, StyleSheet, Pressable, View} from "react-native";
import COLORS from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";

export default React.memo(function NavigationItem({title, onPressItem, index, chosenIndex, iconName}) {
    const isCurrentPage = index === chosenIndex;

    return <View style={[styles.container, {backgroundColor: isCurrentPage ? COLORS.surface : COLORS.backgroundDark}]}>
        <Pressable onPress={onPressItem} android_ripple={{color: COLORS.surface}} style={styles.button}>
            <Ionicons style={{marginRight: 5}} name={iconName} size={25} color={isCurrentPage ? COLORS.primary : COLORS.background}/>
            <Text style={[styles.title, {color: isCurrentPage ? COLORS.primary : COLORS.background}]}>{title}</Text>
        </Pressable>
    </View>
})

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginLeft: 10,
        borderRadius: 10,
        elevation: 4,
        shadowRadius: 5,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowColor: "#000",
        overflow: 'hidden'
    },
    button: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
        textTransform: "uppercase"
    }
})
