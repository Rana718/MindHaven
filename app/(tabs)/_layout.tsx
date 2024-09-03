
import { Tabs } from "expo-router";
import React from "react";
import Colors from "@/constants/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TabsLayout = () => {
    return(
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
            }}
            
        >
            <Tabs.Screen name="nature-mediate"
                options={{
                    tabBarLabel: "Meditate",
                    tabBarIcon: ({ color }) =>(
                        <MaterialCommunityIcons name="flower-tulip" size={24} color={color} />
                    )
                }} 
            />
            <Tabs.Screen name="affirmations"
                options={{
                    tabBarLabel: "affirmations",
                    tabBarIcon: ({ color }) =>(
                        <FontAwesome6 name="door-open" size={24} color={color} />
                    )
                }} 
            />
            
        </Tabs>
    )
}


export default TabsLayout;