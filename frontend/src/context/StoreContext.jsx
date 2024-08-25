import { createContext, useEffect, useState } from "react";
import axios from 'axios'; // Make sure axios is imported

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        const newCartItems = { ...cartItems };
        if (!newCartItems[itemId]) {
            newCartItems[itemId] = 1;
        } else {
            newCartItems[itemId] += 1;
        }
        setCartItems(newCartItems);

        if (token) {
            await axios.post(url+"/api/cart/add", { itemId }, { headers: {token} });
        }
    };

    const removeFromCart = async (itemId) => {
        const newCartItems = { ...cartItems };
        if (newCartItems[itemId]) {
            newCartItems[itemId] -= 1;
            if (newCartItems[itemId] <= 0) {
                delete newCartItems[itemId];
            }
        }
        setCartItems(newCartItems);

        if (token) {
            await axios.post(url+"/api/cart/remove", { itemId }, { headers:{token} });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            console.log('Fetched food list:', response.data.data); // Log the fetched data
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
        
    }

    const fetchCartData = async () => {
        if (token) {
            try {
                const response = await axios.get(`${url}/api/cart`, { headers: { Authorization: `Bearer ${token}` } });
                setCartItems(response.data.cartData);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await fetchCartData();
                await loadCartData(localStorage.getItem("token"));
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
