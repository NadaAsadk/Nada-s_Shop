import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [CartItems, setCartItems] = useState(0);

    const getCartItems = async() => {
        if (userToken != null) {
            try {
                const {data} = await axios.get(`/cart`,{
                    headers:{
                        Authorization: `Tariq__${userToken}`
                    }
                });
                setCartItems(data.products.length);
            } catch (error) {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        getCartItems();
    }, [userToken])

    return <CartContext.Provider value={{ CartItems, setCartItems }}>
        {children}
    </CartContext.Provider>

};

export default CartContextProvider;