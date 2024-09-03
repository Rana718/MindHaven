import { View, Text, ScrollView, Animated, Easing } from "react-native";
import React, { useRef, useEffect } from "react";
import AppGradient from "@/components/AppGradient";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import GuideAffirmationsGallery from "@/components/GuidedAffrimationsGallery";

const Affirmations = () => {
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),

            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
                easing: Easing.ease,
            })

        ]).start();
        
    }, [fadeAnim, scaleAnim]);

    const animateItem = (index: number)=>{
        const itemAnim = useRef(new Animated.Value(0)).current;
        useEffect(()=>{
            Animated.timing(itemAnim, {
                toValue: 1,
                duration: 1500,
                delay: index*200,
                useNativeDriver: true,
                easing: Easing.ease,
            }).start();
        }, [itemAnim, index]);
        return itemAnim;
    }

    return (
        <View className="flex-1">
            <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
                <ScrollView>
                    <Animated.View 
                        style={{
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        }}
                        className="mb-4"
                    >

                        <Text className="text-zinc-50 text-3xl font-bold text-center">
                            Change Your Beliefs with Affirmations
                        </Text>

                    </Animated.View>
                    <View>
                        {AFFIRMATION_GALLERY.map((g, index) => {
                            const itemAnim = animateItem(index);
                            return(
                                <Animated.View key={g.title}
                                    style={{
                                        opacity: itemAnim,
                                        transform: [
                                            {
                                                translateY: itemAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [20, 0],
                                                }),
                                            },
                                        ],
                                    }}
                                    className="bg-white/10 p-4 rounded-2xl mb-4"

                                >
                                    <GuideAffirmationsGallery
                                        title={g.title}
                                        previews={g.data}

                                    />
                                </Animated.View>
                            )
                        })}
                    </View>
                </ScrollView>
            </AppGradient>
        </View>
    );
};

export default Affirmations;
