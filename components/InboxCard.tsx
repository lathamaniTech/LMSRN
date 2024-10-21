import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export type InboxCardProps = {
  title: string;
  leftMarginColor: string;
  subtitle: string;
  count: number;
  icon: string;
  countStyle: string;
  onRoute: any
};
const InboxCard = ({
  title,
  count,
  leftMarginColor,
  subtitle,
  icon,
  countStyle,
  onRoute,
}: InboxCardProps) => {
  return (
    <TouchableOpacity onPress={onRoute}>
      <View
        className="
    flex flex-row items-center
    w-[90vw] h-[50px] 
    p-2
    m-5
    ">
        <View className={`w-[5] h-[50px] ${leftMarginColor} rounded-sm`}></View>
        <View
          className={`flex flex-row w-[30px] h-[30px] ${leftMarginColor} rounded-md
      justify-center items-center mx-5`}
        >
          <Ionicons name={icon} size={20} />
        </View>
        <View className="flex flex-column">
          <Text className="font-psemibold">{title}</Text>
          <Text className="font-pregular">{subtitle}</Text>
        </View>
        <View className="left-10">
          <Text className={`font-pregular shadow-md  ${countStyle}`}>
            {count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InboxCard;
