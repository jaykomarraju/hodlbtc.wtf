import { fetchAddress } from "../api/blockCypherAPI";

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { auth } from "../api/firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 100vw;
  height: 100vh;
`;

const Heading = styled.h2`
  font-size: 3rem;
  padding: 20px;
  margin: 0;
  font-weight: 400;
  font-family: "Major Mono Display", monospace;
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  padding: 20px;
  margin: 0;
  font-weight: 400;
  font-family: "Major Mono Display", monospace;
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid #fff;
  border-radius: 30px;
  font-weight: 700;
  color: #fff;
  margin: 1em;
  padding: 0.5em 1.25em;
  font-size: 1rem;
  font-family: "Major Mono Display", monospace;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const Flexer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  background: transparent;
  border: 2px solid #fff;
  border-radius: 10px;
  font-weight: 700;
  color: #fff;
  margin: 1em;
  padding: 0.5em 1.25em;
  width: 50%;
  font-size: 1rem;
  font-family: "Major Mono Display", monospace;
`;

const SLink = styled(Link)`
  background: transparent;
  // border: 2px solid #fff;
  border-radius: 30px;
  font-weight: 700;
  color: #fff;
  margin: 1em;
  text-decoration: none;
  padding: 0.5em 1.25em;
  font-size: 1rem;
  font-family: "Major Mono Display", monospace;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const SLink2 = styled(Link)`
  background: transparent;
  border: 2px solid #fff;
  border-radius: 30px;
  font-weight: 700;
  color: #fff;
  margin: 1em;
  text-decoration: none;
  padding: 0.5em 1.25em;
  font-size: 1rem;
  font-family: "Major Mono Display", monospace;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;

    width: 50%;
    margin: 0 auto;
    align-items: center;
`;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Heading>LOGIN</Heading>
      <SubHeading>hodlbtc.wtf</SubHeading>
      {error && <p>{error}</p>}
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
      <SLink to="/signup">Sign up</SLink>
    </Container>
  );
};

export default Login;
