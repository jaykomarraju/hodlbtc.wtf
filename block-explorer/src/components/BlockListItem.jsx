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

const BlockListItem = ({ block }) => {
  return (
    <Wrapper>
      <div>
        <Link to={`/block/${block.height}`}>
          <h3>{block.height}</h3>
        </Link>
        <p>{block.hash}</p>
      </div>
      <p>{block.time}</p>
    </Wrapper>
  );
};

export default BlockListItem;
