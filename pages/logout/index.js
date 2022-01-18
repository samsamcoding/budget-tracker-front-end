import { useContext, useEffect } from "react";
import Router from "next/router";
import { UserContext } from "../../UserContext";

export default function index() {
  const { unsetUser } = useContext(UserContext);

  useEffect(() => {
    // Clear local storage of user info
    unsetUser();
    Router.push("/login");
  });

  return null;
}
