import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TransactionListItem = ({ transaction }) => {
  const from = transaction.inputs[0].addresses[0];
  const to = transaction.outputs[0].addresses[0];
  const amount = transaction.outputs[0].value;

  return (
    <tr>
      <td>
        <Link to={`/transaction/${transaction.hash}`}>{transaction.hash}</Link>
      </td>
      <td>{from}</td>
      <td>{to}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default TransactionListItem;
