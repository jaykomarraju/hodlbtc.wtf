import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomePage from "../oldComponents/HomePage";
import SearchBar from "../oldComponents/SearchBar";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #020202;
    color: #fff;
    width: 100%;
    height: 100%;
    margin-top: 100px;
    `;


const Hash = () => {
    return (
        <Container>
           <SearchBar />
        </Container>
    )
}

export default Hash