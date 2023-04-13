import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchTransaction } from "../api/blockCypherAPI";
import Loader from "./Loader";
import Error from "./Error";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchTransaction(id);
        setTransaction(data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    fetchTransactionDetails();
  }, [id]);

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
      <h1>Transaction Details</h1>
      <p>Transaction ID: {transaction.hash}</p>
      <p>Block Height: {transaction.block_height}</p>
      <p>Total Amount: {transaction.total}</p>
      <p>Confirmations: {transaction.confirmations}</p>
    </Wrapper>
  );
};

export default TransactionDetails;
