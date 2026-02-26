import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Svg, { Path } from "react-native-svg";

function ScheduleIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TimerIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DumpIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3c-4.97 0-9 2.69-9 6v6c0 3.31 4.03 6 9 6s9-2.69 9-6V9c0-3.31-4.03-6-9-6zM12 15c-4.97 0-9-2.69-9-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function WinsIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M12 15v5M8 20h8M6 9v3a6 6 0 0012 0V9M6 4h12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#091533" : "#F4F8FC",
          borderTopColor: isDark ? "#0F1F45" : "#EAF0F7",
        },
        tabBarActiveTintColor: "#0FACED",
        tabBarInactiveTintColor: isDark ? "#5E6F94" : "#94A3C8",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => <ScheduleIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: "Timer",
          tabBarIcon: ({ color }) => <TimerIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="dump"
        options={{
          title: "Dump",
          tabBarIcon: ({ color }) => <DumpIcon color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="wins"
        options={{
          title: "Wins",
          tabBarIcon: ({ color }) => <WinsIcon color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
