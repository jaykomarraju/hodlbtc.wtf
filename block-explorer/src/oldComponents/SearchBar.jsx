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
  border: 1.5px solid #fff;
  border-radius: 0.25rem;
  background: transparent;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
padding: 0.75rem 1.25rem;
  
  border-radius: 15px;
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  background: #020202;
        color: #fff;
        border: 1.5px solid #fff;
  outline: none;
  transition: all 0.2s ease-in-out;

    &:hover {
        background: #fff;
  color: #020202;
  border: 1.5px solid #fff;
    }

`;

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    
    const handleSearch = async () => {
        if (inputValue) {
        try {
            const block = await fetchBlock(inputValue);
            console.log(block);
            navigate(`/block/${block.id}`);
        } catch (error) {
            console.log(error);
            try {
            const transaction = await fetchTransaction(inputValue);
            console.log(transaction);
            navigate(`/transaction/${transaction.txid}`);
            } catch (error) {
            try {
                const address = await fetchAddress(inputValue);
                console.log(address);
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
            placeholder="Search for a block, transaction, or address by hash code"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        </Wrapper>
    );
    };

export default SearchBar;