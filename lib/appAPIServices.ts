/**
@author: Lathamani,
date: 26-07-2024
@description: API Service Funtionality. 
*/

import axios, { AxiosResponse } from "axios";
import * as AppType from "@/apptypes/AppTypes";
export const apiURL = AppType.APIURL.UATURL;
// export const apiURL = process.env.EXPO_PUBLIC_API_URL;

const options = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Username: "60011", //55655
  Password: "516edd40eedbe8194bc0e743fe75c59b", // laps@1234,
};

export const postMethod = async (apiMethod: string, reqBody: any) => {
  try {
    const { data } = await axios.post(`${apiURL}/${apiMethod}`, reqBody, {
      headers: options,
    });
    console.info(data, "response", apiMethod);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAPIMethod = async (apiMethod: string, params?: string) => {
  console.info(`${apiURL}/${apiMethod}`);
  try {
    // const { data } = params
    //   ? await axios.get(`${apiURL}/${apiMethod}/${params}`, {
    //       headers: options,
    //     })
    //   : await axios.get(`${apiURL}/${apiMethod}`, {
    //       headers: options,
    //     });
    const { data } = await axios.get(`${apiURL}/${apiMethod}`, {
      headers: options,
    });
    console.info(data, "response", apiMethod);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteAPIMethod = async (apiMethod: string, params?: string) => {
  console.info(apiURL);
  try {
    const { data } = await axios.delete(`${apiURL}/${apiMethod}`, {
      headers: options,
    });
    console.info(data, "response", apiMethod);
    return data;
  } catch (error) {
    return error;
  }
};
