import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #f5f5f5;
  color: #999;
  font-size: 0.8rem;
`;

const Error = () => {
  return (
    <Wrapper>
      <p>Oops! Something went wrong. Please try again later.</p>
    </Wrapper>
  );
};

export default Error;
