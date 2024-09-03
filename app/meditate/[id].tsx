import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditaionData";
import { TimerContext } from "@/context/TImerContext";

const Meditate = () => {
    const { id } = useLocalSearchParams();
    const { duration: secondsRemaining, setDuration } = useContext(TimerContext);
    const [isMeditating, setIsMeditating] = useState(false);
    const [audioSound, setAudioSound] = useState<Audio.Sound>();
    const [playingaudio, setPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (isMeditating) {
            if (secondsRemaining === 0) {
                setIsMeditating(false);
                stopSound();
                return;
            }
            timerId = setTimeout(() => {
                setDuration(secondsRemaining - 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [secondsRemaining, isMeditating]);

    useEffect(() => {
        return () => {
            audioSound?.unloadAsync();
        };
    }, [audioSound]);

    const stopSound = async () => {
        if (audioSound) {
            setPlayingAudio(false);
            await audioSound.stopAsync(); 
        }
    };

    const toggleMeditonSessionStatus = async () => {
        if (secondsRemaining === 0) setDuration(500);
        setIsMeditating(!isMeditating);
        await toggleSound();
    };

    const toggleSound = async () => {
        const sound = audioSound ? audioSound : await intializeAudio();
        const status = await sound?.getStatusAsync();
        if (status?.isLoaded && !playingaudio) {
            await sound.setIsLoopingAsync(true);
            await sound.playAsync();
            setPlayingAudio(true);
        } else {
            await sound?.pauseAsync();
            setPlayingAudio(false);
        }
    };

    const intializeAudio = async () => {
        const audioFilName = MEDITATION_DATA[Number(id) - 1].audio;
        const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFilName]);
        setAudioSound(sound);
        return sound;
    };

    const handleAjustTimer = () => {
        if (isMeditating) toggleMeditonSessionStatus();
        router.push("/(model)/adjust-timer");
    };

    const formattedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
    const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

    return (
        <View className="flex-1">
            <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode="cover" className="flex-1">
                <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back-circle-outline" size={48} color="white" />
                    </Pressable>

                    <View className="flex-1 justify-center">
                        <Pressable className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center" onPress={handleAjustTimer}>
                            <Text className="text-4xl text-blue-800 font-rmono" >
                                {formattedTimeMinutes}:{formattedTimeSeconds}
                            </Text>
                        </Pressable>
                    </View>
                    <View className="mb-5">
                        <CustomButton title="Adjust Timer" onPress={handleAjustTimer} />

                        <CustomButton title={isMeditating ? "Stop" : "Start Meditation"} onPress={toggleMeditonSessionStatus} containerStyles="mt-5" />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default Meditate;
