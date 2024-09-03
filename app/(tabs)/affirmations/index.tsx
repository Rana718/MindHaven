import { View, Text, ScrollView } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import AFFIRMATION_GALLERY  from "@/constants/affirmation-gallery";
import GuideAffirmationsGallery from "@/components/GuidedAffrimationsGallery";

const Affirmations = () => {
    return (
        <View className="flex-1">
            <AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
                <ScrollView>
                    <Text className="text-zinc-50 text-3xl font-bold">
                        Change your beliefs withy affirmations
                    </Text>
                    <View>
                        {AFFIRMATION_GALLERY.map((g)=>(
                            <GuideAffirmationsGallery
                                key={g.title}
                                title={g.title}
                                previews={g.data}    
                            />
                        ))}
                    </View>
                </ScrollView>
            </AppGradient>
            
        </View>
    )
}

export default Affirmations;
