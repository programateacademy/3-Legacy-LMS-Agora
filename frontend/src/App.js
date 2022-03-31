import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchGetUser,
  dispatchLogin,
  fetchUser,
} from "./redux/actions/authAction";

import apiAgora from "./api";
import { RoutesApp } from "./Routes";

export function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAgoraUser");
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const refreshtoken = user.refresh_token;

      const getToken = async () => {
        const res = await apiAgora.post("/api/refresh_token", { refreshtoken });
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <>
      <RoutesApp />
    </>
  );
};
