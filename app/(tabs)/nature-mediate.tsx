import { View, Text, FlatList, Pressable, ImageBackground, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import AppGradient from "@/components/AppGradient";
import { StatusBar } from "expo-status-bar";
import { MEDITATION_DATA } from "@/constants/MeditaionData";
import meditationImages from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Nature = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const renderItem = ({ item }: { item: typeof MEDITATION_DATA[0] }) => (
        <Pressable 
            onPress={() => router.push(`/meditate/${item.id}`)}
            className="h-48 my-3 rounded-md overflow-hidden"
        >
            <ImageBackground 
                source={meditationImages[item.id - 1]}
                resizeMode="cover"
                className="flex-1 rounded-lg justify-center"
            >
                <LinearGradient 
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    className="flex-1 justify-center items-center"
                >
                    <Animated.Text style={{ opacity: fadeAnim }} className="text-gray-100 text-3xl font-bold text-center">
                        {item.title}
                    </Animated.Text>
                </LinearGradient>
            </ImageBackground>
        </Pressable>
    );

    return (
        <View className="flex-1">
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <View className="mb-4 px-2">
                    <Animated.Text style={{ opacity: fadeAnim }} className="text-gray-200 mb-2 font-bold text-3xl text-left">
                        Welcome To MindHaven
                    </Animated.Text>
                    <Animated.Text style={{ opacity: fadeAnim }} className="text-indigo-300 text-xl font-medium">
                        Start Your meditation practice today
                    </Animated.Text>
                </View>
                <View>
                    <FlatList
                        data={MEDITATION_DATA}
                        className="mb-20"
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                    />
                </View>
            </AppGradient>
            <StatusBar style={"light"} />
        </View>
    );
};

export default Nature;
