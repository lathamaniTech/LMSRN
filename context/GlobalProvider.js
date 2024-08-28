import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { getGpsStatus } from "@/lib/geoLocationService";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gpsData, setGpsStatusData] = useState("");
  const [leadId, setLeadId] = useState(""); //LP240820004
  const [userId, setUserId] = useState("60011");

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    getGpsStatus().then((res) => {
      setGpsStatusData(res);
    });
  });
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
        gpsData,
        setGpsStatusData,
        leadId,
        setLeadId,
        userId,
        setUserId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
