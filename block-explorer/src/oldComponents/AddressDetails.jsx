import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchAddress } from "../api/blockCypherAPI";
import TransactionList from "./TransactionList";
import Loader from "./Loader";
import Error from "./Error";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #E5C687;
`;


const AddrBox = styled.div`
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

const AddrDetail = styled.div`
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

const AddrDetailHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;

  // padding: 1rem;
`;

const AddrDetailValue = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Major Mono Display", monospace;
  // padding: 1rem;
  margin: 0;
`;


const AddressDetails = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addressHash } = useParams();

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const address = await fetchAddress(addressHash);
        console.log(address);
        setAddress(address);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchAddressDetails();
  }, [addressHash]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }


  return (
    <Wrapper>
      <AddrBox>
        <Heading>Address Details</Heading>
        <AddrDetail>
          <AddrDetailHeading>Address</AddrDetailHeading>
          <AddrDetailValue>{address.address}</AddrDetailValue>
        </AddrDetail>
        <AddrDetail>
          <AddrDetailHeading>Balance</AddrDetailHeading>
          <AddrDetailValue>{(address.chain_stats.funded_txo_sum - address.chain_stats.spent_txo_sum)*
              0.00000001 +
              " BTC"} </AddrDetailValue>
        </AddrDetail>
        <AddrDetail>
          <AddrDetailHeading>Total Received</AddrDetailHeading>
          <AddrDetailValue>{(address.chain_stats.funded_txo_sum)*
              0.00000001 +
              " BTC"} </AddrDetailValue>
        </AddrDetail>
        <AddrDetail>
          <AddrDetailHeading>Total Sent</AddrDetailHeading>
          <AddrDetailValue>{(address.chain_stats.spent_txo_sum)*
              0.00000001 +
              " BTC"} </AddrDetailValue>
        </AddrDetail>
      </AddrBox>
    </Wrapper>
  );
};

export default AddressDetails;
