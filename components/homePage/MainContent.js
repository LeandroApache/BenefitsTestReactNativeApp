import {View, StyleSheet, ScrollView} from "react-native";
import CategoriesList from "./CategoriesList";
import {useMemo} from "react";

export default function MainContent({products}) {

    const cafeAndBars = useMemo(() => products.filter(p => p.categoryId === "1"), [products]);
    const educationAndHobbies = useMemo(() =>products.filter(p => p.categoryId === "2"), [products]);
    const shopsAndDelivery = useMemo( () =>products.filter(p => p.categoryId === "3"), [products]);
    const entertainments = useMemo(() =>products.filter(p => p.categoryId === "4"), [products]);
    const healthAndBeauty = useMemo(() =>products.filter(p => p.categoryId === "5"), [products]);
    const novelty = useMemo(() =>products.filter(p => p.isNew === "true"), [products]);

    return <View style={styles.container}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.noveltyCarousel}>
                <CategoriesList isNovelties={true} title="Новинки" content={novelty}/>
            </View>
            <View style={styles.carousel}>
                <CategoriesList title="Кафе и бары" categoryId={"1"} content={cafeAndBars}/>
            </View>
            <View style={styles.carousel}>
                <CategoriesList title="Образование и хобби" categoryId={"2"} content={educationAndHobbies}/>
            </View>
            <View style={styles.carousel}>
                <CategoriesList title="Спорт и отдых" categoryId={"3"} content={shopsAndDelivery}/>
            </View>
            <View style={styles.carousel}>
                <CategoriesList title="Развлечения" categoryId={"4"} content={entertainments}/>
            </View>
            <View style={styles.carousel}>
                <CategoriesList title="Здоровье и Красота" categoryId={"5"} content={healthAndBeauty}/>
            </View>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 14
    },
    carousel: {
        flex: 1,
    },
    noveltyCarousel: {
        flex: 5,
        minHeight: 250
    }
});
