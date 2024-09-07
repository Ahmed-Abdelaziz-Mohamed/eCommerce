import { createContext, FC, ReactNode, useEffect, useState } from "react";

export interface UserContextType {
  userLogin: string;
  setUserLogin: (userLogin: string) => void;
}

interface UserContextProviderProps {
  children?: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider: FC<UserContextProviderProps> = (props) => {
  const [userLogin, setUserLogin] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token !== null) {
      setUserLogin(token);
    }
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userLogin, setUserLogin }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export { UserContext, UserContextProvider };
