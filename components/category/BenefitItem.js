import {Text, View, StyleSheet, Pressable, Image, Dimensions, Animated} from "react-native";
import createImagePath from "../../services/createImagePath";
import COLORS from "../../constants/colors";
import {navigate} from "../../navigation/RootNavigation";

const {width, height} = Dimensions.get("window");

export default function BenefitItem({item, scale, opacity}) {

    const imagePath = createImagePath(item.img);

    const showDetailsHandler = () => {
        navigate("Benefit", {benefitId: item.id});
    }

    return <Animated.View style={[styles.itemContainer, {transform: [{scale}], opacity}]}>
        <Pressable onPress={showDetailsHandler} style={{flex: 1}}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={imagePath}/>
                <Text style={styles.discount}>{item.discount}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>

            </View>
        </Pressable>
    </Animated.View>
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        // width: "100%",
        height: height / 3,
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
        shadowColor: "black"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    discount: {
        position: "absolute",
        top: "85%",
        left: "3%",
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 20,
        color: COLORS.primary,
        backgroundColor: COLORS.secondary,
        textAlign: "center",
        fontWeight: "700"
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        color: COLORS.primary,
        opacity: 0.5,
        fontSize: 16,
        fontWeight: "bold"
    }
});


