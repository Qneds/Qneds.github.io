import { createContext } from "react";

const User = createContext({
    user: null,
    setUser: () => {}
});

export default User;