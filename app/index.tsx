import React, { useRef, useEffect } from 'react';
import { Text, View, ImageBackground, SafeAreaView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';

import beachImage from '@/assets/meditation-images/meditation-images/beach.webp'


const App = () => {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View className="flex-1">
            <ImageBackground source={beachImage} resizeMode='cover' className="flex-1">
                <AppGradient className="flex-1 justify-start" colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
                    <SafeAreaView className="flex-1 px-1 justify-between">
                        <View className="text-center">

                            <Animated.Text style={{ opacity: fadeAnim}} className="text-white font-bold text-5xl">
                                Simple Meditation
                            </Animated.Text>

                            <Animated.Text style={{ opacity: fadeAnim}} className="text-white text-xl mt-4 px-6">
                                Simplifying Meditation for Everyone
                            </Animated.Text>
                            
                            <Animated.Text style={{ opacity: fadeAnim}} className="text-white text-md mt-4 px-6">
                                Experience tranquility and peace with our easy-to-follow guided meditations.
                                Whether you are a beginner or an experienced practitioner, our sessions are designed
                                to help you relax and rejuvenate. Join us and discover a new level of calm.
                            </Animated.Text>
                        </View>

                        <View className="flex-1 justify-end items-center mb-1 w-full">
                            <CustomButton containerStyles='px-28 py-4' onPress={()=>router.push('/nature-mediate')} title='Get Started' />
                        </View>
                        <StatusBar style="light" />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default App;
