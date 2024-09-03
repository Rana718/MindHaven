import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import TimerProvider from "@/context/TImerContext";
import { View, Image } from "react-native";
import AppGradient from "@/components/AppGradient";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
    });

    const [isSplashScreenVisible, setSplashScreenVisible] = useState(true);

    useEffect(()=>{
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync();

        const timer = setTimeout(() => {
            setSplashScreenVisible(false);
        },2000);

        return () => clearTimeout(timer);
    },[fontsLoaded, error]);

    if (!fontsLoaded) return null;
    if (!fontsLoaded && !error) return null;

    if(isSplashScreenVisible){
        return (
            <View className="justify-center items-center"> 
                    <Image
                        source={require('@/assets/app_background.jpg')}
                        resizeMode="contain"
                    />
            </View>
        );
    }

    return (
        <TimerProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
                <Stack.Screen name="index" options={{ headerShown: false}}/>
                <Stack.Screen name="meditate/[id]" options={{ headerShown: false}}/>
                <Stack.Screen name="(model)/adjust-timer" options={{ headerShown: false, presentation: "modal" }}/>
            </Stack>
        </TimerProvider>
    )
}