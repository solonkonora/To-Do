"use client"

import HTTPCLIENT from "@/lib/http-client";
import { User } from "./types";

const httpClient = new HTTPCLIENT("/auth");

const getCurrentUser = async () => {
    return httpClient.GET<User>("/current-user");
};

export {
    getCurrentUser,
};
