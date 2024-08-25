import express from "express"
import { loginUser,registerUser } from "../controllers/userController.js"

const useRouter = express.Router()

useRouter.post("/register", registerUser)
useRouter.post("/login",loginUser)

export default useRouter;