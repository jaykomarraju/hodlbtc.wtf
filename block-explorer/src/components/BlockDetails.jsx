import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchBlock } from "../api/blockCypherAPI";
import TransactionList from "./TransactionList";
import Loader from "./Loader";
import Error from "./Error";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const BlockDetails = () => {
  const [block, setBlock] = useState(null);
  const [error, setError] = useState(null);
  const { hash } = useParams();

  useEffect(() => {
    const fetchBlockDetails = async () => {
      try {
        const block = await fetchBlock(hash);
        setBlock(block);
      } catch (error) {
        setError(error);
      }
    };
    fetchBlockDetails();
  }, [hash]);

  if (error) {
    return <Error />;
  }

  if (!block) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <h1>Block Details</h1>
      <p>Block Hash: {block.hash}</p>
      <p>Block Height: {block.height}</p>
      <p>Timestamp: {block.time}</p>
      <p>Miner: {block.miner}</p>
      <p>Number of Transactions: {block.txids.length}</p>
      <TransactionList transactions={block.txids} />
    </Wrapper>
  );
};

export default BlockDetails;
