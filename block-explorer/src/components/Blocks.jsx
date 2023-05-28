import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HomePage from "../oldComponents/HomePage";
import SearchBar from "../oldComponents/SearchBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 100%;
  height: 100%;
`;

const VizBlockChain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 100%;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-top: 1px solid #fff;
    z-index: 0;
  }
`;

const VizBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 150px;
  height: 150px;
  margin: 10px;
  border: 1px solid #fff;
  border-radius: 10px;
  z-index: 1;
  position: relative;
  cursor: pointer;
`;

const BlockList = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const BlockListHeader = styled.tr`
  display: flex;
  padding: 10px;
  font-weight: 800;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 100%;
  height: 100%;
`;

const BlockListDataRow = styled.tr`
  display: flex;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 100%;
  height: 100%;

  :hover {
    font-weight: 800;
    cursor: pointer;
    }
`;

const BlockListData = styled.td`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  background-color: #020202;
  color: #fff;
  width: 100%;
  height: 100%;
`;

const Blocks = () => {
  return (
    <Container>
      <VizBlockChain>
        <VizBlock>#761,627</VizBlock>

        <VizBlock>#761,626</VizBlock>

        <VizBlock>#761,625</VizBlock>

        <VizBlock>#761,625</VizBlock>

        <VizBlock>#761,625</VizBlock>

        <VizBlock>#761,625</VizBlock>
      </VizBlockChain>

      <BlockList>
        <BlockListHeader>
          <BlockListData>Block Height</BlockListData>
          <BlockListData>Hash</BlockListData>
          <BlockListData>Time</BlockListData>
          <BlockListData>Nonce</BlockListData>
          <BlockListData>TX Count</BlockListData>
          <BlockListData>Total Sent</BlockListData>
          <BlockListData>Value Today</BlockListData>
        </BlockListHeader>
        <BlockListDataRow>
          <BlockListData>787,284</BlockListData>
          <BlockListData>00000-cd7a6</BlockListData>
          <BlockListData>1h 48m 47s</BlockListData>
          <BlockListData>2,299,706,752</BlockListData>
          <BlockListData>3,392</BlockListData>
          <BlockListData>402.51 BTC</BlockListData>
          <BlockListData>$11,894,291</BlockListData>
        </BlockListDataRow>
        <BlockListDataRow>
          <BlockListData>787,284</BlockListData>
          <BlockListData>00000-cd7a6</BlockListData>
          <BlockListData>1h 48m 47s</BlockListData>
          <BlockListData>2,299,706,752</BlockListData>
          <BlockListData>3,392</BlockListData>
          <BlockListData>402.51 BTC</BlockListData>
          <BlockListData>$11,894,291</BlockListData>
        </BlockListDataRow>
        <BlockListDataRow>
          <BlockListData>787,284</BlockListData>
          <BlockListData>00000-cd7a6</BlockListData>
          <BlockListData>1h 48m 47s</BlockListData>
          <BlockListData>2,299,706,752</BlockListData>
          <BlockListData>3,392</BlockListData>
          <BlockListData>402.51 BTC</BlockListData>
          <BlockListData>$11,894,291</BlockListData>
        </BlockListDataRow>
        <BlockListDataRow>
          <BlockListData>787,284</BlockListData>
          <BlockListData>00000-cd7a6</BlockListData>
          <BlockListData>1h 48m 47s</BlockListData>
          <BlockListData>2,299,706,752</BlockListData>
          <BlockListData>3,392</BlockListData>
          <BlockListData>402.51 BTC</BlockListData>
          <BlockListData>$11,894,291</BlockListData>
        </BlockListDataRow>
        <BlockListDataRow>
          <BlockListData>787,284</BlockListData>
          <BlockListData>00000-cd7a6</BlockListData>
          <BlockListData>1h 48m 47s</BlockListData>
          <BlockListData>2,299,706,752</BlockListData>
          <BlockListData>3,392</BlockListData>
          <BlockListData>402.51 BTC</BlockListData>
          <BlockListData>$11,894,291</BlockListData>
        </BlockListDataRow>
        <BlockListDataRow>
          <BlockListData>787,284</BlockListData>
          <BlockListData>00000-cd7a6</BlockListData>
          <BlockListData>1h 48m 47s</BlockListData>
          <BlockListData>2,299,706,752</BlockListData>
          <BlockListData>3,392</BlockListData>
          <BlockListData>402.51 BTC</BlockListData>
          <BlockListData>$11,894,291</BlockListData>
        </BlockListDataRow>
      </BlockList>
    </Container>
  );
};

export default Blocks;
