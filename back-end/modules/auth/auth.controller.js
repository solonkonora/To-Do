import { json } from "stream/consumers";
import { UserService } from "../user/user.service.js"
import { AuthService } from "./auth.service.js"

const SignupHandler = async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password
  }

  const existingUser = await UserService.getByUsername(data.username);

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists, please try another name",
      data: null,
    });
  }

  const hashedPassword = await AuthService.hashPassword(data.password);

  data.password = hashedPassword
  const { password, ...userData } = await UserService.createUser(data);
  const token = AuthService.jwtSignUser(userData);

  res.status(200).json({
    message: "Signup Successful",
    data: token,
  });
}

const LoginHandler = async (req, res) => {
  try {
    const user = await UserService.getByUsername(req.body.username)

    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
        data: null
      });
    }

    const isPasswordMatch = await AuthService.matchPassword(req.body.password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect Password",
        data: null,
      });
    }

    const { password, ...userData } = user;

    const token = AuthService.jwtSignUser(userData);

    res.status(200).json({
      message: "Login Successful",
      data: token,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error.message || "Something went wrong",
      data: null,
    });
  }
}

const GetCurrentUser = async (req, res) => {
  const token = req.headers.authorization.split(" ").pop();

  try {
    const sessionUser = AuthService.jwtVerifyUser(token || "");

    if (!sessionUser || !sessionUser.username) {
      return res.status(401).json({
        message: "No user found",
        data: null,
      });
    };

    const { password, ...currentUser } = await UserService.getByUsername(sessionUser.username);

    return res.status(200).json({
      message: "User Retrieved",
      data: currentUser,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something went wrong",
      data: null,
    })
  }
};

export {
  SignupHandler,
  LoginHandler,
  GetCurrentUser,
}