import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { auth } from "../api/firebase";
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
  width: 50%;
  font-weight: 700;
  color: #fff;
  margin: 1em;
  padding: 0.5em 1.25em;
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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btcAddress, setBtcAddress] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Save btcAddress to your database if necessary
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Heading>SIGN UP</Heading>
      <SubHeading>hodlbtc.wtf</SubHeading>
      <Input
        type="email"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Input
        type="text"
        placeholder="enter btc address (optional)"
        value={btcAddress}
        onChange={(e) => setBtcAddress(e.target.value)}
      />
      <Flexer>
        <Button onClick={handleSignUp}>sign up</Button>
      </Flexer>
      <SLink to="/login">login</SLink>
    </Container>
  );
};

export default SignUp;
