import {View, StyleSheet, Text} from "react-native";
import {useContext, useEffect, useState} from "react";
import data from '../server/db.json';
import COLORS from "../constants/colors";
import BenefitsList from "../components/category/BenefitsList";
import {RootContext} from "../store";

export default function CategoryOverviewScreen({route, navigation}) {
    const catId = route.params.categoryId.toString();
    const title = route.params.title;
    const categoryItems = data.benefits.filter(benefit => benefit.categoryId === catId);
    const {changeCategory} = useContext(RootContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('transitionStart', (e) => {
            if (e.data.closing) {
                changeCategory(0);
            }
        });

        return unsubscribe;
    }, [navigation]);

    return <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <BenefitsList items={categoryItems}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingLeft: 5,
        paddingRight: 15,
        backgroundColor: COLORS.background
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 15,
    },
    title: {
        fontSize: 28,
        lineHeight: 28,
        fontFamily: "main-bold",
        color: COLORS.primaryText
    },
});

