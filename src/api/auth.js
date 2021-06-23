import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null") {
    return null;
  } else {
  }

 return willExpireToken(accessToken) ? null : accessToken;
  
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);

  const { exp } = metaToken;

  const now = (Date.now() + seconds) / 1000;

  return now > exp;
}
