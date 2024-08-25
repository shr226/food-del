import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userId = req.body.userId;
        let itemId = req.body.itemId;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userId = req.body.userId;
        let itemId = req.body.itemId;
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }
            await userModel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Removed from Cart" });
        } else {
            res.json({ success: false, message: "Item not in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userId = req.body.userId;
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
