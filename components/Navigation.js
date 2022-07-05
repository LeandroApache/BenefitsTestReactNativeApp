import {View, StyleSheet, FlatList} from "react-native";
import {useCallback, useContext, useEffect, useRef} from "react";
import NavigationItem from "./NavigationItem";
import data from "../server/db.json";
import COLORS from "../constants/colors";
import {navigate} from "../navigation/RootNavigation";
import {RootContext} from "../store";

export default function Navigation() {
    const {currentCategory, changeCategory} = useContext(RootContext);
    const flatListRef = useRef();
    const categories = data.categories;

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: currentCategory,
            animated: true,
        })
    }, [currentCategory]);

    const categoryPressHandler = (index, title) => {
        changeCategory(index);
        if (index !== 0) {
            navigate("CategoryOverview", {categoryId: index, title});
        } else {
            navigate("Home");
        }
    }

    const renderItem = useCallback(({item, index}) => <NavigationItem
        onPressItem={categoryPressHandler.bind(null, index, item.title)} iconName={item.icon} chosenIndex={currentCategory} index={Number(index)}
        title={item.title} navigate={navigate}/>, [currentCategory]);

    const extractKey = useCallback(item => item.id, [currentCategory]);

    return <View style={styles.navigationContainer}>
        <FlatList showsHorizontalScrollIndicator={false}
                  initialScrollIndex={currentCategory}
                  ref={flatListRef}
                  onScrollToIndexFailed={() => {
                      console.log("Scroll Error");
                  }}
                  horizontal
                  data={categories}
                  renderItem={renderItem}
                  keyExtractor={extractKey}
        />
    </View>
}

const styles = StyleSheet.create({
    navigationContainer: {
        height: 60,
        width: "100%",
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundDark,
        alignItems: 'center',
        backgroundColor: COLORS.background,
    }
})
