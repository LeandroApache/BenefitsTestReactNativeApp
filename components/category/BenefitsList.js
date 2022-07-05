import {View, StyleSheet, Animated, Dimensions} from "react-native";
import React, {useCallback} from "react";
import BenefitItem from "./BenefitItem";

const height = Dimensions.get("window").height;

export default function BenefitsList({items}) {

    const scrollY = React.useRef(new Animated.Value(0)).current;

    const renderItemsHandler = useCallback(({item, index}) => {
        const scaleInputRange = [
            -1,
            0,
            height / 3 * index,
            height / 3 * (index + 2)
        ];

        const opacityInputRange = [
            -1,
            0,
            height / 3 * index,
            height / 3 * (index + 1)
        ];

        const scale = scrollY.interpolate({
            inputRange: scaleInputRange,
            outputRange: [1, 1, 1, 0],
        });

        const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
        });

        return <BenefitItem scale={scale} opacity={opacity} item={item}/>
    }, [items, scrollY]);

    const extractKeyHandler = useCallback((item) => item.id, []);

    return <View style={styles.container}>
        <Animated.FlatList style={styles.list} data={items} renderItem={renderItemsHandler}
                           keyExtractor={extractKeyHandler}
                           showsVerticalScrollIndicator={false}
                           onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 15,
    },
    list: {
        width: "100%"
    }
});
