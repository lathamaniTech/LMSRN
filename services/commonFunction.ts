import { Alert } from "react-native";

export const presentConfirmAlert = (title: string, message: string) => {
  return new Promise((resolve, reject) => {
    Alert.alert(title, message, [
      {
        text: "No",
        onPress: () => resolve("No"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => resolve("Yes") },
    ]);
  });
};

export const presentSimpleAlert = (title: string, message: string) => {
  return new Promise((resolve, reject) => {
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => resolve("OK"),
        style: "cancel",
      },
    ]);
  });
};

export const sortData = (dataList: any, sortBy: string) => {
  return dataList.sort((a: any, b: any) =>
    a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1
  );
};

export const getCatchError = (error: any, methodName: string) => {
  if (error instanceof Error) {
    return Alert.alert(`${methodName}: ${error.message}`);
  } else {
    return Alert.alert(`${methodName}: ${error}`);
  }
};
