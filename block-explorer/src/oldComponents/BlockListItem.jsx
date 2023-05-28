import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  max-width: 800px;
  padding: 2rem;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
  margin-bottom: 2rem;
  background-color: #fff;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;

  justify-content: center;
`;

const H3 = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  underline: none;

  margin: 0;
  padding: 1rem;
`;

const P = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Major Mono Display", monospace;
  padding: 1rem;
  margin: 0;
`;

const Link1 = styled(Link)`
  text-decoration: none;
  color: #212529;
  margin: 0;
  font-family: "Major Mono Display", monospace;
`;

const BlockListItem = ({ block }) => {
  return (
    <Wrapper>
      <ItemBox>
        <Link1 to={`/block/${block.height}`}>
          <H3>BLOCK NUMBER: {block.height}</H3>
        </Link1>
        <P>BLOCK HASH: {block.hash}</P>
      </ItemBox>
      <P>{block.time}</P>
    </Wrapper>
  );
};

export default BlockListItem;
