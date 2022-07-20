import React from "react";
import {Text, StyleSheet, Pressable, View} from "react-native";
import COLORS from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";

export default React.memo(function NavigationItem({title, onPressItem, index, chosenIndex, iconName}) {
    const isCurrentPage = index === chosenIndex;

    return <View style={[styles.container, {backgroundColor: isCurrentPage ? COLORS.activeLink : COLORS.inactiveLink}]}>
        <Pressable onPress={onPressItem} android_ripple={{color: COLORS.secondaryText}} style={styles.button}>
            <Ionicons style={{marginRight: 7.3}} name={iconName} size={15} color={isCurrentPage ? COLORS.secondaryText : COLORS.primaryText}/>
            <Text style={[styles.title, {color: isCurrentPage ? COLORS.secondaryText : COLORS.primaryText}]}>{title}</Text>
        </Pressable>
    </View>
})

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        borderRadius: 12,
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
        padding: 12,
    },
    title: {
        fontSize: 15,
        lineHeight: 16,
        textAlign: "center",
        fontFamily: "main-bold"
    }
})
