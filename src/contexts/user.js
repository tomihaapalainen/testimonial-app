import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { auth, handleSignOut } from "../firebase/client";
import { getAdditionalUserInfo, getRedirectResult } from "@firebase/auth";
import { useHistory } from "react-router";
import { getIdToken } from "@firebase/auth";
import axios from "axios";
import { baseUrl } from "../config";
import Spinner from "../common/loading/Spinner";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const fetchUserData = useCallback(async () => {
    getIdToken(user).then((idToken) => {
      axios
        .get(`${baseUrl}/user/data`, { headers: { Authorization: `Bearer ${idToken}` } })
        .then((response) => {
          if (response.status === 200) {
            setUserData(response.data);
          }
        })
        .catch((error) => {
          handleSignOut();
        })
        .finally(() => setLoading(false));
    });
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {}
    });

    const handleSignInWithRedirect = async () => {
      let userCredential = await getRedirectResult(auth);
      if (!userCredential || userCredential.user === null) {
        return;
      }
      const additionalUserInfo = getAdditionalUserInfo(userCredential);
      if (additionalUserInfo.isNewUser) {
        history.push("/register");
      }
    };

    handleSignInWithRedirect();
    return unsubscribe;
  }, [history]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
