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
  background: #33a1fd;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  margin: 0 auto;
  width: 70%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #33a1fd;
  font-family: "Major Mono Display", monospace;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  text-align: center;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  background: #fff;
  color: #000;
  border: 1.5px solid #E5C687;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #E5C687;
    color: #000;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
`;

const LatestBlockBox = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  padding: 1rem;
  margin: 2rem auto;
  background: #fff;
  // max-width: 650px;
  width: 90%;
  border: 4.5px solid #E5C687;
  border-radius: 6px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: all 0.2s ease-in-out;

  h2 {
    font-size: 1.5rem;

    font-family: "Major Mono Display", monospace;
  }

  :hover {
    background: #E5C687;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

// create a box that provides a short description of the bitcoin whitepaper and also a link to the whitepaper
const WhitePaperBox = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  padding: 1rem;
  margin: 2rem auto;
  background: #fff;
  max-width: 650px;
  border: 4.5px solid #E5C687;
  border-radius: 6px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: all 0.2s ease-in-out;

  h2 {
    font-size: 1.5rem;

    font-family: "Major Mono Display", monospace;
  }

  :hover {
    background: #E5C687;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;


const BlockDetailHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;

  // padding: 1rem;
`;
const BlockDetailHeading2 = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;

  font-family: "Major Mono Display", monospace;
  padding: 1rem;
`;

const BlockDetailValue = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Major Mono Display", monospace;
  // padding: 1rem;
  margin: 0;
  overflow-wrap: break-word;
`;

const BlockDetail = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;

  // margin: 0 auto;
  // background: #fff;
  // border-radius: 10px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  // margin-bottom: 1rem;
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
        <HeroSubtitle>Explore the Bitcoin blockchain with just a hash code!</HeroSubtitle>
        {/* <HeroButton to="/blocks">View Blocks</HeroButton> */}
        {/* <HeroImage src="/images/bitcoin.png" alt="Bitcoin" /> */}

        <SearchBar />
        {isLoading && <Loader />}
        {error && <Error error={error} />}
        {latestBlock && (
          <LatestBlockBox>
            {/* <h2>Latest Block</h2>
            <p>Height: {latestBlock.height}</p>
            <p>Hash: {latestBlock.id}</p>
            <p>
              Time:{" "}
              {
                convertUnixTime(latestBlock.timestamp)
                // latestBlock.timetamp
              }
            </p> */}
            <h2>Latest Block</h2>
            <BlockDetail>
              <BlockDetailHeading>Block No.</BlockDetailHeading>
              <BlockDetailValue>{latestBlock.height}</BlockDetailValue>
            </BlockDetail>
            <BlockDetail>
              <BlockDetailHeading>Hash</BlockDetailHeading>
              <BlockDetailValue>{latestBlock.id}</BlockDetailValue>
            </BlockDetail>
            <BlockDetail>
              <BlockDetailHeading>Time</BlockDetailHeading>
              <BlockDetailValue>
                {convertUnixTime(latestBlock.timestamp)}
              </BlockDetailValue>
            </BlockDetail>

          </LatestBlockBox>
        )}
        <WhitePaperBox>
          <h2>Bitcoin Whitepaper</h2>
          <p>
            The Bitcoin whitepaper was published on October 31, 2008 by Satoshi
            Nakamoto. The paper was titled "Bitcoin: A Peer-to-Peer Electronic
            Cash System" and was published on the cypherpunks mailing list.
          </p>
          <p>
            The paper was written in English and was 9 pages long. The paper
            described the Bitcoin protocol and its underlying technology. The
            paper was written in a way that was easy to understand for a
            non-technical audience.
          </p>
          <p>
            The paper was written in a way that was easy to understand for a
            non-technical audience.
          </p>
          <a href="https://bitcoin.org/bitcoin.pdf" target="_blank">
            Read the Bitcoin Whitepaper
          </a>
        </WhitePaperBox>

        <WhitePaperBox>
          <h2>History of HODL</h2>
          <p>
            The word "HODL" originated in the cryptocurrency community and has
            become a widely recognized term within that context. It is an
            intentional misspelling of the word "hold" and is used to encourage
            people to hold onto their cryptocurrencies rather than selling them
            during market fluctuations. The term has since expanded beyond
            cryptocurrencies and is now often used in reference to holding any
            financial asset for the long term.
          </p>
          <p>
            The history of "HODL" can be traced back to December 18, 2013, when
            a user posted on the BitcoinTalk forum with the
            title "I AM HODLING." The post was made during a period of
            significant volatility in the Bitcoin market, and the author
            expressed their frustration with attempts to time the market and
            trade based on price fluctuations. The post resonated with many in
            the community, and "HODL" quickly gained popularity as a rallying
            cry for long-term investors in cryptocurrencies.
          </p>
          <p>
            Over time, some users have attempted to attribute an acronymic
            meaning to the term, such as "Hold On for Dear Life." However, this
            is a backronym—a phrase created after the fact to fit the existing
            term—and not the original intention behind the misspelling.
          </p>
          <p>
            "HODL" continues to be a popular term in the cryptocurrency and
            investment communities, symbolizing a long-term approach to
            investing and a belief in the future value of an asset, despite
            short-term market fluctuations.
          </p>
        </WhitePaperBox>
      </Hero>
    </Wrapper>
  );
};

export default HomePage;
