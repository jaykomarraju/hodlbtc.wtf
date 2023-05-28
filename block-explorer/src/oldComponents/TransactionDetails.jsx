import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  fetchTransaction,
  fetchLatestBlockHeight,
} from "../api/blockCypherAPI";
import Loader from "./Loader";
import Error from "./Error";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #e5c687;
`;

const TxBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  justify-content: center;
  max-width: 800px;
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

const TxDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  justify-content: center;
  max-width: 800px;
  padding: 2rem;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
  // margin-bottom: 2rem;
  background-color: #fff;
`;

const TxDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  justify-content: center;
  width:90%;
  padding: 2rem;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
  // margin-bottom: 2rem;
  background-color: #fff;
`;

const TxDetailHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;

  // padding: 1rem;
`;

const TxDetailValue = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Major Mono Display", monospace;
  // padding: 1rem;
  margin: 0;
`;

const Flexer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Padder = styled.div`
  padding: 1rem;
`;


const Flexer2 = styled.div`
  display: flex;
  flex-direction: row;
  // align-items: center;
  justify-content: space-between;
  // width: 100%;

  // :hover {
  //   background-color: #f5f5f5;
  // }
`;

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [debitAddresses, setDebitAddresses] = useState([]);
  const [debitAmounts, setDebitAmounts] = useState([]);
  const [creditAddresses, setCreditAddresses] = useState([]);
  const [creditAmounts, setCreditAmounts] = useState([]);
  const [latestBlockHeight, setLatestBlockHeight] = useState(-1);
  const { txHash } = useParams();

  console.log(txHash);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchTransaction(txHash);
        const latestHeight = await fetchLatestBlockHeight();
        setTransaction(data);
        setLatestBlockHeight(latestHeight);
        const inputAddresses = data.vin.map((input) => [
          input.prevout.scriptpubkey_address,
          (input.prevout.value * 0.00000001).toFixed(3),
        ]);
        // also get the amount sent from each address
        // const inputAmounts = data.vin.map(input => input.prevout.value);
        const outputAddresses = data.vout.map((output) => [
          output.scriptpubkey_address,
          (output.value * 0.00000001).toFixed(3),,
        ]);
        setDebitAddresses(inputAddresses);
        // setDebitAmounts(inputAmounts);
        setCreditAddresses(outputAddresses);
        // setCreditAmounts(outputAmounts);
        console.log(inputAddresses);
        console.log(outputAddresses);
        console.log(data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    fetchTransactionDetails();
  }, [txHash]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!transaction) {
    return null;
  }

  return (
    <Wrapper>
      {/* <h1>Transaction Details</h1>
      <p>Transaction Hash: {transaction.txid}</p>
      <p>Block Number: {transaction.status.block_height}</p>
      <p>
        Total Amount:{" "}
        {transaction.vout.reduce((sum, output) => sum + output.value, 0) *
          0.00000001 +
          " BTC"}
      </p> */}

      <Heading>Transaction Details</Heading>

      <TxBox>
        <TxDetail>
          <TxDetailHeading>Transaction Hash</TxDetailHeading>
          <TxDetailValue>{transaction.txid}</TxDetailValue>
        </TxDetail>
        <Flexer>
          <TxDetail>
            <TxDetailHeading>Block Number</TxDetailHeading>
            <TxDetailValue>{transaction.status.block_height}</TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Total Amount</TxDetailHeading>
            <TxDetailValue>
              {transaction.vout.reduce((sum, output) => sum + output.value, 0) *
                0.00000001 +
                " BTC"}
            </TxDetailValue>
          </TxDetail>
        </Flexer>
        <Flexer>
          <TxDetail>
            <TxDetailHeading>Confirmations</TxDetailHeading>
            <TxDetailValue>
              {latestBlockHeight - transaction.status.block_height}
            </TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Size</TxDetailHeading>
            <TxDetailValue>{transaction.size + " bytes"}</TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Weight</TxDetailHeading>
            <TxDetailValue>{transaction.weight + " bytes"}</TxDetailValue>
          </TxDetail>
        </Flexer>
        {/*create the debit and credit tables and columns and display the addresses and the respective balance received/sent  */}

        <TxDetail2>
          <TxDetailHeading>Debit Addresses</TxDetailHeading>
          <TxDetailValue>
            {debitAddresses.map((address, index) => (
              <Flexer2 key={index}>
                <Padder>
                  {address[0]}
                </Padder>
                <Padder>
                  {address[1] + " BTC"}
                </Padder>
              </Flexer2>
            ))}
          </TxDetailValue>
        </TxDetail2>

        <TxDetail2>
          <TxDetailHeading>Credit Addresses</TxDetailHeading>
          <TxDetailValue>
            {creditAddresses.map((address, index) => (
              <Flexer2 key={index}>
                <Padder>
                  {address[0]}
                </Padder>
                <Padder>
                  {address[1] + " BTC"}
                </Padder>
              </Flexer2>
            ))}
          </TxDetailValue>
        </TxDetail2>



      </TxBox>

      {/* <Heading>Inputs</Heading>
              
      {transaction.vin.map((input, index) => (
        <TxBox key={index}>
          <TxDetail>
            <TxDetailHeading>Transaction Hash</TxDetailHeading>
            <TxDetailValue>{input.txid}</TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Index</TxDetailHeading>
            <TxDetailValue>{input.vout}</TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Address</TxDetailHeading>
            <TxDetailValue>{input.addresses[0]}</TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Amount</TxDetailHeading>
            <TxDetailValue>{input.value * 0.00000001 + " BTC"}</TxDetailValue>
          </TxDetail>

          <TxDetail>

          </TxDetail>
        </TxBox>
      ))}
      <Heading>Outputs</Heading>
      {transaction.vout.map((output, index) => (
        <TxBox key={index}>
          <TxDetail>
            <TxDetailHeading>Index</TxDetailHeading>
            <TxDetailValue>{output.n}</TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Address</TxDetailHeading>
            <TxDetailValue>{output.scriptpubkey_address}</TxDetailValue>
          </TxDetail>

          <TxDetail>
            <TxDetailHeading>Amount</TxDetailHeading>
            <TxDetailValue>{output.value * 0.00000001 + " BTC"}</TxDetailValue>
          </TxDetail>

          <TxDetail>

          </TxDetail>
        </TxBox>
      ))} */}

      {/* <p>Sender: {}</p>
      <p>
        Confirmations: {latestBlockHeight - transaction.status.block_height}
      </p> */}
    </Wrapper>
  );
};

export default TransactionDetails;
