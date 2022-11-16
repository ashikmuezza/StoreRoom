import React from "react";
import { useAccount } from "wagmi";
import "./Login.css";

export function Login() {
  const data = useAccount();
  console.log(data);

  return (
   
      data.isConnected && (
      <div className="Login">
        <p>connected address is </p>
        <p>{data.address} </p>
      </div>
      )
  );
}

export default Login;
