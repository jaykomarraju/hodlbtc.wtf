// This is the list of components in this Bitcoin block explorer application:
// App: The main application component that wraps all other components and handles routing.
// Header: A component that displays the application header with a logo, title, and navigation links.
// Footer: A component that displays the application footer with copyright information and any relevant links.
// HomePage: A component that displays the landing page with visually appealing elements such as hero banners, graphics, and an overview of the latest blocks, recent transactions, or any other relevant information you want to showcase.
// SearchBar: A reusable component for searching blocks, transactions, and addresses. This component should include a clear input field with an attractive search button and possibly autocomplete suggestions for a better user experience.
// BlockList: A component that lists blocks with pagination in a user-friendly table or card layout. Each item in the list should include basic information such as block height, timestamp, number of transactions, and block hash.
// BlockListItem: A reusable component that represents an individual block item in the BlockList. This component should have a visually appealing design that displays the block's details in a clear and easy-to-read manner.
// BlockDetails: A component that displays detailed information about a specific block in an organized layout with sections for block hash, height, timestamp, miner, number of transactions, and the list of transactions in the block.
// TransactionList: A component that lists transactions within a block or related to an address in a user-friendly table or card layout. Each item in the list should include basic information such as transaction ID, input and output addresses, and the amount.
// TransactionListItem: A reusable component that represents an individual transaction item in the TransactionList. This component should have a visually appealing design that displays the transaction's details in a clear and easy-to-read manner.
// TransactionDetails: A component that displays detailed information about a specific transaction in an organized layout with sections for transaction ID, block height, input and output addresses, and the amount.
// AddressDetails: A component that displays information about a specific address in an organized layout with sections for balance, total transactions, and the list of associated transactions.
// Loader: A reusable component that displays a loading animation or spinner while data is being fetched.
// Error: A reusable component that displays error messages in a user-friendly manner.
// Pagination: A reusable component that provides pagination functionality for the BlockList and TransactionList.

// The data can be fetched from the following API endpoints:
// Path: block-explorer/src/api/blockCypher.js. This is the API endpoint for fetching Bitcoin data from the BlockCypher API. fetchBlock, fetchTransaction, fetchAddress, fetchLatestBlock

// This is the Header component:

import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #fff;
//   border-bottom: 1px solid #dee2e6;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

const Link1 = styled(Link)`
  flex: 4;
  text-decoration: none;
  color: #33A1FD;
  font-size: 1.75rem;
  color: #33A1FD;
  font-weight: 700;
  margin: 0;

  font-family: "Major Mono Display", monospace;
`;

const Linka = styled(Link)`
  flex: 1;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: #212529;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;

  &:hover {
    color: #007bff;
  }
`;

const Header = () => {
  const logo =
    "https://www.blockchain.com/explorer/static/media/logo.5d5d9eef.svg";
  return (
    <Wrapper>
      <Link1 to="/">hodlbtc.wtf</Link1>
      {/* <Title>Block Explorer</Title> */}
      <Linka to="/blocks">Blocks</Linka>
      <Linka to="/transactions">Transactions</Linka>
      <Linka to="/addresses">Addresses</Linka>
    </Wrapper>
  );
};

export default Header;
