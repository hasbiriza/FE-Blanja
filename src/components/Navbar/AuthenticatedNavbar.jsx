import { useEffect, useState } from "react";

import NavbarNonLogin from "./NavbarNonLogin";
import NavbarLogin from "./NavbarLogin";

const AuthenticatedNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role")
    setIsLoggedIn(id !== null);
    setRole(role);
    setId(id);
  }, []);

  return isLoggedIn ? <NavbarLogin id={id} role={role} /> : <NavbarNonLogin />;
};

export default AuthenticatedNavbar;