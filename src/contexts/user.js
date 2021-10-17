import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/client";
import { getAdditionalUserInfo, getRedirectResult } from "@firebase/auth";
import { useHistory } from "react-router";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);

  const history = useHistory();

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
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
