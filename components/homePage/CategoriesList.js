import {FlatList, StyleSheet, Text, View, ViewStyle, TextStyle, Pressable} from "react-native";
import * as React from "react";
import CategoriesListItem from "./CategoriesListItem";
import {useCallback, useContext} from "react";
import COLORS from "../../constants/colors";
import {navigate} from "../../navigation/RootNavigation";
import {RootContext} from "../../store";
import CategoriesListPlaceholder from "./CategoriesListPlaceholder";

const MAX_RENDERED_ITEMS = 6;


export default function CategoriesList({title, content, isNovelties, categoryId}) {
    const {changeCategory} = useContext(RootContext);
    const needPlaceholder = content.length >= MAX_RENDERED_ITEMS;
    const numberForPlaceholder = content.length - MAX_RENDERED_ITEMS;
    const updatedContent = needPlaceholder ?  content.slice(0, MAX_RENDERED_ITEMS) : content;

    const renderItem = useCallback(({item}) => <CategoriesListItem isNoveltiesItem={isNovelties} item={item}/>, []);

    const onPressAllButton = () => {
        navigate("CategoryOverview", {categoryId, title});
        changeCategory(Number(categoryId));
    }

    return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {!isNovelties && <Pressable onPress={onPressAllButton}>
                <Text style={styles.link}>Все</Text>
            </Pressable>}
        </View>
        <View style={styles.body}>
            <FlatList showsHorizontalScrollIndicator={false}
                      data={updatedContent}
                      renderItem={renderItem}
                      horizontal={true}
                      keyExtractor={(item) => item.id}
                      ListFooterComponent={needPlaceholder ?
                          <CategoriesListPlaceholder title={title} categoryId={categoryId}
                                                     num={numberForPlaceholder}/> : null}
            />
        </View>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    link: {
        color: COLORS.surface,
        fontSize: 15,
        fontWeight: "bold"
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        color: COLORS.primary,
        textTransform: "uppercase",
        letterSpacing: 1.2
    },
    body: {
        flex: 1,
    }
});

