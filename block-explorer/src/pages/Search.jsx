// This is the page where a user MUST BE LOGGED IN to access
// It is for all authenticated users

import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchAddress } from "../api/blockCypherAPI";
import { fetchUser } from "../api/blockCypherAPI";
import Hash from "../components/Hash";
import Blocks from "../components/Blocks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #020202;
  color: #fff;
  width: 100vw;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 20px;
`;

const Heading = styled.h2`
  font-size: 2rem;
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

const SLink = styled(Link)`
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


const SedLink = styled(Link)`
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 30px;
//   font-weight: 800;
  color: #020202;

  margin: 1em;
  text-decoration: none;
  padding: 0.5em 1.25em;
  font-size: 1rem;
  font-family: "Major Mono Display", monospace;

  &:hover {
    background-color: #fff;
    color: #000;
    font-weight: 800;
  }
`;

const SBFlexer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CompWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
`;

const Flexer = styled.div`
  display: flex;

  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
`;

const Search = () => {
  return (
    <Container>
      <Wrapper>
        <SBFlexer>
          <Heading>HODLBTC.WTF</Heading>
          <SLink to="/logout">Log out</SLink>
        </SBFlexer>
        <SubHeading>a community for the bitcoin maximalists.</SubHeading>
        <Flexer>
          <SLink to="/blocks">blocks</SLink>
          <SedLink to="/hash">hash search</SedLink>
          {/* <SLink to="/activity">network activity</SLink> */}
          <SLink to="/chat">hodlchat</SLink>
        </Flexer>
        <CompWrapper>
            {/* <Blocks/> */}
          <Hash/>
        </CompWrapper>
      </Wrapper>
    </Container>
  );
};

export default Search;
