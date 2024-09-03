import { View, Text, ImageBackground, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import AppGradient from "@/components/AppGradient";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "react-native/Libraries/NewAppScreen";

const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();
    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<string[]>([]);

    useEffect(() => {
        for (let idx=0; idx<AFFIRMATION_GALLERY.length; idx++) {
            const affirmationsData = AFFIRMATION_GALLERY[idx].data;
            const affirmationToStart = affirmationsData.find(
                (a) => a.id === Number(itemId)
            );
            if (affirmationToStart) {
                setAffirmation(affirmationToStart);
                const affirmationsArray = affirmationToStart.text.split(".");
                if (affirmationsArray[affirmationsArray.length-1] === ''){
                    affirmationsArray.pop();
                }
                setSentences(affirmationsArray);
                return
            }
        }
    },[])

    return (
        <View className="flex-1">
            <ImageBackground source={affirmation?.image} resizeMode="cover" className="flex-1">

            <AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
                <Pressable onPress={()=> router.back()}
                    className="absolute top-16 left-6 z-10"    
                >
                    <Ionicons name="arrow-back-circle-outline" size={48} color="white" />
                </Pressable>
                <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
                    <View className="h-full justify-center">
                        <View className="h-4/5 justify-center">
                            {sentences.map((sentence, idx) =>(
                                <Text key={idx} className="text-white text-3xl mb-12 text-center font-bold">{sentence}</Text>
                            ))}
                            
                        </View>
                    </View>

                </ScrollView>
            </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default AffirmationPractice;