import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));

    const [userName, setUserName] = useState(null);

    const [userImage, setUserImage] = useState(null);

    const getUserData = async() => {
        if (userToken != null) {
            try {
                const {data} = await axios.get(`/user/profile`,{
                    headers:{
                        Authorization: `Tariq__${userToken}`
                    }
                });
                setUserName(data.user.userName);
                setUserImage(data.user.image.secure_url);
               

            } catch (error) {
                
            }
        }
    };
    useEffect(() => {
        getUserData();
    }, [userToken])
    return <UserContext.Provider value={{ setUserToken, userName, userImage}}>
        {children}
    </UserContext.Provider>

};

export default UserContextProvider;