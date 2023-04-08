import React, { useEffect } from "react";
import Home from "./components/Home";
import api from "./services/api";

const App = () =>  {
    useEffect(() => {
        async function fetchData() {
          const result = await api.call("post", "auth/login", {
            username: "username",
            password: "password",
          });
          console.log(result);
        }
        fetchData();
      }, []);
      

  return(
    <Home/>

  )
}

export default App;
