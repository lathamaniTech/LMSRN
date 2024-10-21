import { Alert, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getAPIMethod, postMethod } from "@/lib/appAPIServices";
import * as AppType from "@/apptypes/AppTypes";
import * as AppStaticMsg from "@/apptypes/AppStaticMessage";
import LoadingControl from "@/components/loading";
import { router, useNavigation } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import LeadCard from "@/components/leadCard";
import { Endpoints } from "@/constants";
import SubHeaderWithStatus from "@/components/subheaderWithStatus";
import { dbopsMainProductsMasters, dbopsStaticDataMasters } from "@/services";
import * as SecureStore from 'expo-secure-store';

const IncompleteLeadPage = () => {
  const { userId, setLeadId, setDisabledSaveBtn } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [leadList, setLeadList] = useState([]);
  const [leadShow, setLeadShow] = useState(false);
  const [leadStatusList, setLeadStatusList] = useState<AppType.KeyValueString[]>([]);
  useEffect(() => {
    setLeadId("");
    getLeadStatus();
    incompleteList();
  }, []);

  const getLeadStatus = async () => {
    const leadCategory = await dbopsStaticDataMasters.findBasedOnMasterId(AppType.StaticDataMasterId.LeadStatus);
    setLeadStatusList(leadCategory);
  }

  const leadpage = async (leadid: string) => {
    setLeadId(leadid);
    setDisabledSaveBtn(false);
    SecureStore.setItemAsync('newLead', 'INCOMPLETE');
    router.push("(leadtabs)/sourcing");
  };

  const incompleteList = async () => {
    try {
      setIsLoading(true);
      let response = await getAPIMethod(`${Endpoints.LeadInbox}/${userId}/${Endpoints.IncompleteLeads}`);
      console.log(response, 'incompleteList');
      if (response.status == AppType.ResponseStatusCode.STATUSOK) {
        const mainProductList = await dbopsMainProductsMasters.findAll();
        setIsLoading(false);
        setLeadShow(true);
        let resData = response.leadList;
        resData.forEach((item: any) => {
          let getdata = mainProductList.find((val: any) => val.facId == item.ldPrdCode);
          getdata ? item['ldPrdName'] = getdata.facDesc : '';
        });
        setLeadList(response.leadList);

      } else {
        setIsLoading(false);
        Alert.alert(AppStaticMsg.AlertMessage.AlertTitle, AppStaticMsg.AlertMessage.NoLeadsFromServer);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", JSON.stringify(error));
    }
  };

  return (
    <>
      <SubHeaderWithStatus />
      {isLoading && <LoadingControl isLoading={isLoading} />}
      <View className="mt-[20px]">
        <View>
          {!leadShow && (
            <View className="flex item-center h-full">
              <Text className="text-center">No Data Found</Text>
            </View>
          )}
          {leadShow &&
            leadList.map((val: any) => {
              return (
                <LeadCard
                  key={val.viewSeqId}
                  leadData={val}
                  leadStatusList={leadStatusList}
                  onRoute={() => leadpage(val.viewSeqId)}
                />
              );
            })}
        </View>
      </View>
    </>
  );
};

export default IncompleteLeadPage;
