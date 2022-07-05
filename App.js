import {Easing, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
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
import {useEffect} from "react";

const Stack = createStackNavigator();

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

export default function App() {
    return <>
        <StatusBar/>
        <ContextProvider>
            <SafeAreaView style={styles.container}>
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator screenOptions={{
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
