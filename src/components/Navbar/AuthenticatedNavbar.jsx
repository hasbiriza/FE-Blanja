import { useEffect, useState } from "react";

import NavbarNonLogin from "./NavbarNonLogin";
import NavbarLogin from "./NavbarLogin";

const AuthenticatedNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    setIsLoggedIn(id !== null);
    setId(id);
  }, []);

  return isLoggedIn ? <NavbarLogin id={id} /> : <NavbarNonLogin />;
};

export default AuthenticatedNavbar;