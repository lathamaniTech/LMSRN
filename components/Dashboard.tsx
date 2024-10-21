import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InboxCard from "./InboxCard";
import { router } from "expo-router";
import { getAPIMethod } from "@/lib/appAPIServices";
import * as AppType from "@/apptypes/AppTypes";
import * as AppStaticMsg from "@/apptypes/AppStaticMessage";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Endpoints } from "@/constants";

export type DashboardProps = {
  otherStyle: string;
};
const Dashboard = ({ otherStyle }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [leadsList, setleadsList] = useState({ assigned: 0, incomplete: 0, complete: 0 });
  const { userId } = useGlobalContext();

  useEffect(() => {
    assignedLeadsList();
  }, []);

  const assignedLeadsList = async () => {
    setleadsList({ assigned: 0, incomplete: 0, complete: 0 });
    try {
      setIsLoading(true);
      const response = await getAPIMethod(`${Endpoints.LeadInbox}/${userId}/ATM`);
      console.log(response, 'assignedLeadsList');
      if (response.status == AppType.ResponseStatusCode.STATUSOK) {
        leadsList.assigned = response.leadList.length;
        setleadsList(leadsList);
        incompletLeads();
      } else {
        incompletLeads();
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", JSON.stringify(error));
    }

  }
  const incompletLeads = async () => {
    try {
      const incompletRes = await getAPIMethod(`${Endpoints.LeadInbox}/${userId}/INCM`);
      console.log(incompletRes, 'incompletRes');

      if (incompletRes.status == AppType.ResponseStatusCode.STATUSOK) {
        leadsList.incomplete = incompletRes.leadList.length;
        setleadsList(leadsList);
        completeLeads();
      } else {
        completeLeads();
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", JSON.stringify(error));
    }
  }
  const completeLeads = async () => {
    try {
      const completRes = await getAPIMethod(`${Endpoints.LeadInbox}/${userId}/CLS`);
      console.log(completRes, 'completRes');

      if (completRes.status == AppType.ResponseStatusCode.STATUSOK) {
        leadsList.complete = completRes.leadList.length;
        setleadsList(leadsList);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", JSON.stringify(error));
    }
  }
  return (
    <View
      className={`
     flex flex-column justify-center
    `}
    >
      <View className="flex flex-column w-[85vw] justfify-center items-center">
        <InboxCard
          title="Assigned Leads"
          count={leadsList.assigned}
          icon="copy-outline"
          leftMarginColor="bg-green"
          countStyle="text-green text-2xl"
          subtitle="All assigned leads comes here"
          onRoute={() => router.push("assignedLeads")}
        />

        <InboxCard
          title="Incomplete Leads"
          count={leadsList.complete}
          icon="notifications-outline"
          leftMarginColor="bg-purple"
          countStyle="text-purple text-2xl"
          subtitle="All incomplete leads comes here"
          onRoute={() => router.push("incompleteLeads")}
        />

        <InboxCard
          title="Completed Leads"
          count={leadsList.incomplete}
          icon="checkmark-done"
          leftMarginColor="bg-yellow"
          countStyle="text-secondary text-xl"
          subtitle="All completed leads comes here"
          onRoute={() => router.push("completeLeads")}
        />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
