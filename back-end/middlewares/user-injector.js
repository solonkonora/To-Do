import { AuthService } from "../modules/auth/auth.service.js";

const userInjector = (req, _, next) => {
  const token = req.headers?.authorization?.split(" ")?.pop() || "";

  const currentUser = AuthService.jwtVerifyUser(token);

  req.user = currentUser;

  next();
};

export {
  userInjector,
};
