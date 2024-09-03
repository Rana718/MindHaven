import { View, Text, Pressable } from "react-native";
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

    return (
        <View className="flex-1 relative">
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
                <Pressable onPress={()=> router.back()} className="absolute mt-12 left-6 z-10">
                    <Ionicons name="arrow-back-circle-outline" size={48} color="white" />
                </Pressable>
                <View className="justify-center h-4/5">
                    <Text className="text-center font-bold text-3xl text-white mt-32 pb-5">
                        Adjust your meditation duration
                    </Text>
                    <View>
                        <CustomButton title="1 minute" onPress={()=>(handlePress(1*60))} containerStyles="mb-5"/>
                        <CustomButton title="5 minutes" onPress={()=>(handlePress(5*60))} containerStyles="mb-5"/>
                        <CustomButton title="10 minutes" onPress={()=>(handlePress(10*60))} containerStyles="mb-5"/>
                        <CustomButton title="15 minutes" onPress={()=>(handlePress(15*60))} containerStyles="mb-5"/>
                        <CustomButton title="30 minutes" onPress={()=>(handlePress(30*60))} containerStyles="mb-5"/>
                        <CustomButton title="1 hour" onPress={()=>(handlePress(60*60))} containerStyles="mb-5"/>
                        <CustomButton title="2 hours" onPress={()=>(handlePress(120*60))} containerStyles="mb-1"/>
                    </View>
                </View>
            </AppGradient>
        </View>
    );
};

export default adjust_timer;