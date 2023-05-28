import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchAddress } from "../api/blockCypherAPI";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #020202;
    color: #fff;
    width: 100vw;
    // height: 100vh;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #020202;
    color: #fff;
    width: 100vw;
    height: 100vh;
    border-bottom: 2px solid #fff;
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


const Flexer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const BLink = styled(Link)`
    background: transparent;
    border: 2px solid #fff;
    border-radius: 30px;
    font-weight: 700;
    color: #fff;
    margin: 1em;
    padding: 0.5em 1.25em;
    text-decoration: none;
    font-size: 2rem;
    width: 6em;
    height:6em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Major Mono Display", monospace;
    

    &:hover {
        background-color: #fff;
        color: #000;
    }
`;


const HomePage = () => {

    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    return (
        <Container>
            <Wrapper>
            <Heading>HODLBTC.WTF</Heading>
            <SubHeading>a community for the bitcoin maximalists.</SubHeading>
            <Flexer>
                <SLink to="/signup">sign up</SLink>
                <SLink to="/login">login</SLink>
            </Flexer>
            </Wrapper>
            <Wrapper>
                <Flexer>
                    <BLink>BITCOIN WHITEPAPER</BLink>
                    <BLink>WHAT IS HODL?</BLink>
                </Flexer>
            </Wrapper>
        </Container>
    );
}

export default HomePage;
