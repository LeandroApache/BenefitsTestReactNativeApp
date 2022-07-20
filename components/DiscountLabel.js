import {Text, StyleSheet} from "react-native";
import React from "react";
import COLORS from "../constants/colors";

export default function DiscountLabel({children}) {
    return <Text style={styles.discount}>{children}</Text>
}

const styles = StyleSheet.create({
    discount: {
        position: "absolute",
        top: "80%",
        left: "3%",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 100,
        color: COLORS.secondaryText,
        backgroundColor: COLORS.discount,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 12,
        lineHeight: 16
    },
})
