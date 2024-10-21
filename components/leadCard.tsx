import { View, Text, TouchableOpacity, Image, StyleSheet, Linking, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getCatchError } from "@/services/commonFunction";

export type LeadCardProps = {
  leadData: any;
  onRoute: Function | any;
  leadStatusList: any;
};
const LeadCard = ({
  leadData,
  onRoute,
  leadStatusList
}: LeadCardProps) => {

  const getFirstLetter = (name: string) => {
    try {
      let firstLetter = name.charAt(0).toUpperCase();
      return firstLetter ? firstLetter : 'N';
    } catch (error) {
      getCatchError(error, 'getFirstLetter')
    }
  }

  const getChangeSubStatusName = (subStatus: string) => {
    try {
      let getStatusName = leadStatusList.find((val: any) => { return val.rdValueCode == subStatus });
      return getStatusName ? getStatusName.rdValueDescription : '';
    } catch (err) {
      getCatchError(err, 'getChangeSubStatusName')
    }
  }

  const makePhoneCall = async (phnumber: Record<string, string | number | null>) => {
    const url = `tel:${phnumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Sorry, your device doesn't support this feature.");
    }

  }

  const createTask = (leadData: Record<string, string | number | null>) => {

  }

  const leadStatus = (leadData: Record<string, string | number | null>) => {

  }

  return (
    <View className="flex bg-white rounded border border-gray-100
    shadow-lg shadow-gray-500/50 mx-4 my-1.5 divide-y divide-gray-200 divide-solid">
      <TouchableOpacity onPress={onRoute}>
        <View className="flex flex-row items-center w-[100%]">
          <View className="flex items-center justify-center w-[50px] h-[50px] m-3 border-solid border-2 border-blue-700 rounded-full">
            <Text className="text-center text-lg font-bold text-fuchsia-600">{getFirstLetter(leadData.mdName)}</Text>
          </View>

          <View className="w-[60%] py-2 px-2">
            <View className="flex flex-row w-full">
              <Text className="text-base font-bold">{leadData.mdName}</Text>
              <Text className="text-blue text-right">{getChangeSubStatusName(leadData.ldLeadSubstatus)}</Text>
            </View>
            <Text className="text-sm">{leadData.viewSeqId}</Text>
            <Text className="text-sm">{leadData.ldPrdCode ? leadData.ldPrdName : leadData.ldPrdCode}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="flex-row justify-center items-center w-[100%] px-3 pt-3 pb-2">
        <View className="flex justify-center items-center w-[33%]">
          <Ionicons name="call" size={20} color="gray" onPress={() => makePhoneCall(leadData.mdCorpPhone)} />
        </View>
        <View className="flex justify-center items-center w-[33%]">
          <Ionicons name="calendar" size={20} color="gray" onPress={() => createTask(leadData)} />
        </View>
        <View className="flex justify-center items-center w-[33%]">
          <Ionicons name="person" size={20} color="gray" onPress={() => leadStatus(leadData)} />
        </View>
      </View>
    </View>
  );
};

export default LeadCard;

