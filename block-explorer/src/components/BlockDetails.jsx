import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchBlock, fetchTransactionListByBlock } from "../api/blockCypherAPI";
import TransactionList from "./TransactionList";
import Loader from "./Loader";
import Error from "./Error";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #E5C687;
`;

const BlockBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;  overflow-wrap: break-word;

  max-width: 800px;
width: 80%;
  justify-content: center;
  // max-width: 800px;
  padding: 2rem;
  border-radius: 5px;
  // &:hover {
  //   background-color: #f5f5f5;
  // }
  margin-bottom: 2rem;
  background-color: #fff;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 2rem;
  font-family: "Major Mono Display", monospace;
`;

const BlockDetail = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: flex-start;
  text-decoration: none;
  // justify-content: center;
  width: 80%;
  max-width: 800px;
  overflow-wrap: break-word;
  padding: 2rem;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
  // margin-bottom: 2rem;
  background-color: #fff;
`;

const BlockDetailHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;

  // padding: 1rem;
`;

const BlockDetailValue = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Major Mono Display", monospace;
  // padding: 1rem;
  margin: 0;
  overflow-wrap: break-word;
`;




// This components is to display a single block. It uses the useParams hook to get the block hash from the URL. It then uses the fetchBlock function to fetch the block data from the API. It then displays the block data and the list of transactions in the block.
// /block/hash

const BlockDetails = () => {
  const [block, setBlock] = useState({});
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const { blockHash } = useParams(); // Get the hash from the URL

  const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleString();
  };

  console.log(blockHash);

  useEffect(() => {
    const fetchAPI = async () => {
      setBlock(await fetchBlock(blockHash));
      setTransactions(await fetchTransactionListByBlock(blockHash));
      console.log(transactions);
      setLoading(false);
    };

    fetchAPI();
  }, [blockHash]);

  return (
    <Wrapper>
      {loading && <Loader />}
      {error && <Error />}
      {block && (
        <BlockBox>
          <Heading>Block Details</Heading>
          <BlockDetail>
            <BlockDetailHeading>BLOCK NUMBER</BlockDetailHeading>
            <BlockDetailValue> {block.height}</BlockDetailValue>
          </BlockDetail>
          <BlockDetail>
            <BlockDetailHeading>BLOCK HASH</BlockDetailHeading>
            <BlockDetailValue> {block.id}</BlockDetailValue>
          </BlockDetail>
          <BlockDetail>
            <BlockDetailHeading>BLOCK TIMESTAMP</BlockDetailHeading>
            <BlockDetailValue> {convertUnixTime(block.timestamp)}</BlockDetailValue>
          </BlockDetail>
          {/* <BlockDetail>
            <BlockDetailHeading>PREVIOUS BLOCK</BlockDetailHeading>
            <BlockDetailValue> {block.previousblockhash}</BlockDetailValue>
          </BlockDetail> */}
          {/* <p>Next Block: {block.next_block}</p> */}
          <BlockDetail>
            <BlockDetailHeading>TRANSACTIONS IN BLOCK</BlockDetailHeading>{" "}
            <BlockDetailValue> {block.tx_count}</BlockDetailValue>
          </BlockDetail>
          {/* <TransactionList transactions={block.txids} /> */}
          {/* <TransactionList transactions={transactions} /> */}
        </BlockBox>
      )}
    </Wrapper>
  );
};

export default BlockDetails;
