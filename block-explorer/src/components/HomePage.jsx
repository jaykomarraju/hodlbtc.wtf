import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLatestBlock } from "../api/blockCypherAPI";
import Loader from "./Loader";
import Error from "./Error";
import SearchBar from "./SearchBar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  background: #33A1FD;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #33A1FD;
  font-family: 'Major Mono Display', monospace;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  background: #33A1FD;
  color: #fff;
  border: 1.5px solid #33A1FD;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #fff;
    color: #33A1FD;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
`;

const HomePage = () => {
  const [latestBlock, setLatestBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleString();
    };

  useEffect(() => {
    const fetchLatestBlockData = async () => {
      try {
        const latestBlock = await fetchLatestBlock();
        setLatestBlock(latestBlock);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchLatestBlockData();
  }, []);

  return (
    <Wrapper>
      <Hero>
        <HeroTitle>hodlbtc.WTF</HeroTitle>
        <HeroSubtitle>Explore the Bitcoin blockchain with ease.</HeroSubtitle>
        <HeroButton to="/blocks">View Blocks</HeroButton>
        {/* <HeroImage src="/images/bitcoin.png" alt="Bitcoin" /> */}

        <SearchBar />
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {latestBlock && (
        <div>
          <h2>Latest Block</h2>
          <p>Height: {latestBlock.height}</p>
          <p>Hash: {latestBlock.hash}</p>
          <p>Time: {
            // convertUnixTime(latestBlock.time)
            latestBlock.time
            }</p>
        </div>
      )}

      </Hero>
      
    </Wrapper>
  );
};

export default HomePage;
