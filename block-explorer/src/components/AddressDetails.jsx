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
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const AddressTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const AddressHash = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const AddressBalance = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const AddressTransactions = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const AddressDetails = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addressHash } = useParams();

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const data = await fetchAddress(addressHash);
        setAddress(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchAddressData();
  }, [addressHash]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <Address>
        <AddressTitle>Address Details</AddressTitle>
        <AddressHash>{address.address}</AddressHash>
        <AddressBalance>
          Balance: {address.final_balance / 100000000} BTC
        </AddressBalance>
        <AddressTransactions>
          Total Transactions: {address.total_transactions}
        </AddressTransactions>
      </Address>
      <TransactionList transactions={address.txrefs} />
    </Wrapper>
  );
};

export default AddressDetails;
