import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";

import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [account, setAccount] = React.useState('');
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);

  const [registeredAddress, setRegisteredAddress] = React.useState('');

  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();

    setAccounts(accounts);
    setAuth(auth);
  };

  const signUp = async () => {
    if (!username || !email || !password) {
      alert("please fill all details");
      return;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("please enter valid email address");
      return;
    }
    try {
      await auth.methods
        .register(username, email, password)
        .call({ from: accounts });
      await auth.methods
        .register(username, email, password)
        .send({ from: accounts }).on('receipt', (receipt) => {setRegisteredAddress(account);
          localStorage.setItem('registeredAddress', account);
        });
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } catch (e) {
      if(e.message.includes("Username already taken")){
        alert("Username already taken")
      }
      else if(e.message.includes("Email already registered")){
        alert("Email already registered")
      }
      else{
        alert(e.message)
      }
    }
  };
  React.useEffect(() => {
    loadWeb3();
  }, []);

  React.useEffect(() => {
    loadAccounts();
  }, []);

  return (
    
    <div style={rootDiv}>
      <h1>Registration: </h1>
      <input
        style={input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
      />
      <input
        style={input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input
        style={input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button style={button} onClick={signUp}>
        {" "}
        Sign Up
      </button>
    </div>
  );
}

const rootDiv = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#eeeeee"
};

const input = {
  width: 300,
  padding: 10,
  margin: 10,
  borderRadius: 10,
  outline: "none",
  border: "2px solid #047eff",
  fontSize: 20,
};

const button = {
  width: 325,
  padding: 10,
  borderRadius: 10,
  margin: 10,
  cursor: "pointer",
  fontSize: 20,
  color: "white",
  backgroundColor: "#047eff",
  border: "none",
};
