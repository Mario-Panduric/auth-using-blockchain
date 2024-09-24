import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const username = localStorage.getItem("username");
  const account = localStorage.getItem("registeredAddress");
  const navigate = useNavigate();
  return (
    <div>
      <h3>Welcome: {username} </h3>
      <h3>Address: {account} </h3>
      <button
        style={button}
        onClick={() => {
          localStorage.removeItem("email");
          localStorage.removeItem("registeredAddress");
          localStorage.removeItem("username");
          window.location.reload();
        }}
      >
        {" "}
        Log out
      </button>
    </div>
  );
}
const button = {
  width: 100,
  padding: 10,
  borderRadius: 5,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "#047eff",
  border: "none",
};
