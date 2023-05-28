import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchBlock, fetchTransaction } from "../api/blockCypherAPI";
import TransactionListItem from "./TransactionListItem";
import Loader from "./Loader";
import Error from "./Error";

const Wrapper = styled.div`
  padding: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeaderCell = styled.th`
  padding: 0.5rem;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TransactionList = () => {
  const { hash } = useParams();
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlockData = async () => {
      setLoading(true);
      try {
        const data = await fetchBlock(hash);
        const txPromises = data.txids.map((txid) => fetchTransaction(txid));
        const transactions = await Promise.all(txPromises);
        setBlock({ ...data, transactions });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchBlockData();
  }, [hash]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>From</TableHeaderCell>
            <TableHeaderCell>To</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {block &&
            block.transactions.map((transaction) => (
              <TransactionListItem
                key={transaction.hash}
                transaction={transaction}
              />
            ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};

export default TransactionList;
