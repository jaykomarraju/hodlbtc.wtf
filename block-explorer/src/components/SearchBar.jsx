import React, { useState } from "react";
import styled from "styled-components";
// import { useHistory } from "react-router-dom"; 
// useHistory is deprecated in v5.1.0
// it has been replaced with useNavigate

import { useNavigate } from "react-router-dom";
import { fetchBlock, fetchTransaction, fetchAddress } from "../api/blockCypherAPI";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
padding: 0.75rem 1.25rem;
  background: #fff;
  color: #33A1FD;
  border: 1.5px solid #33A1FD;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

    &:hover {
        background: #33A1FD;
        color: #fff;
        border: 1.5px solid #33A1FD;
    }

`;

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    
    const handleSearch = async () => {
        if (inputValue) {
        try {
            const block = await fetchBlock(inputValue);
            navigate(`/block/${block.hash}`);
        } catch (error) {
            try {
            const transaction = await fetchTransaction(inputValue);
            navigate(`/transaction/${transaction.hash}`);
            } catch (error) {
            try {
                const address = await fetchAddress(inputValue);
                navigate(`/address/${address.address}`);
            } catch (error) {
                alert("Invalid search input");
            }
            }
        }
        }
    };
    
    return (
        <Wrapper>
        <Input
            type="text"
            placeholder="Search for a block, transaction, or address"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        </Wrapper>
    );
    };

export default SearchBar;