import React from "react";
import { useAccount } from "wagmi";
import "./Login.css";

export function Login() {
  const data = useAccount();
  console.log(data);

  return (

      data.isConnected && (
      <div>
        <p>connected address is </p>
        <p1>{data.address} </p1>
      </div>

      )

  );
}

export default Login;
