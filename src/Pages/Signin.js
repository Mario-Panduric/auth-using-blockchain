import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);


  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();

    setAccounts(accounts);
    setAuth(auth);
  };

  const login = async () => {
    if (!email || !password) {
      alert("please fill all credentials");

      return;
    }
    try {
      const res = await auth.methods.login(email, password).call();
      localStorage.setItem("email", email);
      localStorage.setItem("username", res[0]);
      localStorage.setItem('registeredAddress', res[1]);
      navigate("/Home");
      window.location.reload()
    } catch (error) {
      alert("Invalid password or username.");
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
      <h1>Login: </h1>
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
      <button style={button} onClick={login}>
        {" "}
        Sign In
      </button>

      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/Signup");
        }}
      >
        {" "}
        Create new account{" "}
      </span>
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