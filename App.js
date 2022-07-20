import {Easing, Image, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    createStackNavigator,
    TransitionSpecs,
    CardStyleInterpolators
} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import {StatusBar} from "expo-status-bar";
import CategoryOverviewScreen from "./screens/CategoryOverviewScreen";
import Navigation from "./components/Navigation";
import COLORS from "./constants/colors";
import {navigationRef} from "./navigation/RootNavigation";
import BenefitScreen from "./screens/BenefitScreen";
import ContextProvider, {RootContext} from "./store";
import {useCallback, useEffect, useState} from "react";
import FavoritesScreen from "./screens/FavoritesScreen";
import AccountScreen from "./screens/AccountScreen";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
    animation: "spring",
    config: {
        stiffness: 1000,
        damping: 200,
        mass: 2,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01
    }
}

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
    }
}

const customTransition = {
    gestureEnabled: false,
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({current, next, layouts}) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        })
                    },
                    {
                        rotate: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["180deg", "0deg"],
                        }),
                    },
                    {
                        scale: next ?
                            next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.7],
                            }) : 1,
                    }
                ]
            },
            opacity: current.opacity,
        }
    }
}

function StackNavigator() {
    return <Stack.Navigator screenOptions={{
        // gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardOverlayEnabled: true,
        transitionSpec: {open: config, close: closeConfig},
        header: Navigation
    }}>
        <Stack.Screen options={{
            ...customTransition
            // transitionSpec: {
            //     open: config,
            //     close: closeConfig,
            // },
            // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} name="Home" component={HomeScreen}/>
        <Stack.Screen options={{
            ...customTransition
            // transitionSpec: {
            //     open: config,
            //     close: closeConfig,
            // },
            // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} name="CategoryOverview" component={CategoryOverviewScreen}/>
        <Stack.Screen name="Benefit" options={{
            headerShown: false,
            ...customTransition,
            gestureEnabled: true,
        }} component={BenefitScreen}/>
    </Stack.Navigator>
}

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const customFonts = {
        'main-bold': require("./assets/fonts/mainFontBold.ttf"),
        'main': require("./assets/fonts/mainFontRegular.ttf"),
    }

    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync(customFonts);
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return <>
        <StatusBar backgroundColor={COLORS.background}/>
        <ContextProvider>
            <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
                <NavigationContainer ref={navigationRef}>
                    <Tab.Navigator screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconPath;
                            if (route.name === 'AllCategories') {
                                iconPath = focused
                                    ? require('./assets/icons/percentsActive.png')
                                    : require('./assets/icons/percents.png')
                            } else if (route.name === 'Favorites') {
                                iconPath = focused
                                    ? require('./assets/icons/heartActive.png')
                                    : require('./assets/icons/heart.png')
                            } else if (route.name === 'Account') {
                                iconPath = focused
                                    ? require('./assets/icons/account.png')
                                    : require('./assets/icons/account.png')
                            }
                            return <Image source={iconPath}/>;
                        },
                        tabBarStyle: {backgroundColor: COLORS.background},
                        tabBarLabelStyle: {
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: 15,
                            lineHeight: 16,
                            textAlign: "center",
                            paddingBottom: 3,
                        },
                        headerShown: false,
                        tabBarActiveTintColor: '#2F50F4',
                        tabBarInactiveTintColor: '#989BB3',
                    })}>
                        <Tab.Screen name="AllCategories" component={StackNavigator} options={{title: "Cкидки"}}/>
                        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{title: "Избранное"}}/>
                        <Tab.Screen name="Account" component={AccountScreen} options={{title: "Аккаунт"}}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </ContextProvider>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: COLORS.background,
    },
});
