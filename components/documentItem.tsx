/*
@author         :   Lathamani
@since          :   20/08/2024
@description    :   saved documents list grid
*/
import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as AppType from "@/apptypes/AppTypes"

export type DocItemDataProp = {
    docItemData: any,
    applicantList: AppType.ApplicantListLOV[];
    handleViewPress: any,
    handleDeletePress: any,
}

const DocumentItem = ({ docItemData, applicantList, handleViewPress, handleDeletePress }: DocItemDataProp) => {
    const getApplicantName = (custId: string) => {
        let getdata = applicantList.find(val => { return val.customerId == custId })
        return getdata ? getdata.applicantType : custId
    }

    return (
        <View className="flex flex-row items-center">
            <Text className="w-[20%] mx-1 text-center font-bold text-xs">{getApplicantName(docItemData.ladCustId)}</Text>
            <Text className="w-[25%] mx-1 text-center font-bold text-xs">{docItemData.ladDocClass}</Text>
            <Text className="w-[25%] mx-1 text-center font-bold text-xs">{docItemData.ladAttachedDocumentName}</Text>
            <View className="w-[30%] mx-1 flex-row">
                <Text className='ml-[5px] mr-[15px]'><Ionicons name="eye" size={24} color="blue" onPress={handleViewPress} /></Text>
                <Text><Ionicons name="trash" size={24} color="red" onPress={handleDeletePress} /></Text>
            </View>
        </View >
    )
}

export default DocumentItem;