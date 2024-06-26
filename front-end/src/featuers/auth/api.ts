import HTTPCLIENT from "@/lib/http-client";
import { User } from "@/providers/context/api/types";

const httpClient = new HTTPCLIENT("/auth");

const signUp = (user: Pick<User, "password" | "username">) => {
  return httpClient.POST<string>("/signup", user);
};

const login = (user: Pick<User, "password" | "username">) => {
  return httpClient.POST<string>("/login", user);
};

export { signUp, login };
