import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import AppGradient from "@/components/AppGradient";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TImerContext";

const adjust_timer = () => {

    const { setDuration } = useContext(TimerContext)

    const handlePress = (durantion: number) => {
        setDuration(durantion);
        router.back();
    }

    const durations = [
        { title: "1 minute", duration: 1 * 60 },
        { title: "5 minutes", duration: 5 * 60 },
        { title: "10 minutes", duration: 10 * 60 },
        { title: "15 minutes", duration: 15 * 60 },
        { title: "30 minutes", duration: 30 * 60 },
        { title: "1 hour", duration: 60 * 60 },
        { title: "2 hours", duration: 120 * 60 }
    ];

    return (
        <View className="flex-1 relative">
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <Pressable onPress={()=> router.back()} className="absolute mt-12 left-6 z-10">
                    <Ionicons name="arrow-back-circle-outline" size={48} color="white" />
                </Pressable>
                <View className="justify-center">
                    <Text className="text-center font-bold text-3xl text-white mt-10 pb-5">
                        Adjust your meditation duration
                    </Text>
                    <ScrollView>
                        {durations.map(({ title, duration }, index) => (
                            <CustomButton containerStyles="mt-5" key={index} title={title} onPress={()=>handlePress(duration)} />
                        ))}
                    </ScrollView>
                </View>
            </AppGradient>
        </View>
    );
};

export default adjust_timer;