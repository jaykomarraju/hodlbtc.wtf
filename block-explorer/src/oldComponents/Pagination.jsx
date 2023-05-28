import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const Page = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem;
  border: 1px solid #ccc;
  border-radius: 50%;
  color: #333;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const Pagination = ({ currentPage, totalPages }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <Wrapper>
      {pages.map((page) => (
        <Page key={page} to={`/${page}`}>
          {page}
        </Page>
      ))}
    </Wrapper>
  );
};

export default Pagination;
