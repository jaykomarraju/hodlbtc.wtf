import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchBlocksInRange, fetchLatestBlock } from "../api/blockCypherAPI";
import BlockListItem from "./BlockListItem";
import Pagination from "./Pagination";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

const BlockListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blocksPerPage] = useState(10);

  useEffect(() => {
    const fetchAPI = async () => {
      const latestBlock = await fetchLatestBlock();
      const endBlock = latestBlock.height;
      console.log(endBlock);
      // const startBlock = endBlock - blocksPerPage * (currentPage - 1);
      const startBlock = endBlock - blocksPerPage * (currentPage);
      console.log(startBlock);
      setBlocks(await fetchBlocksInRange(startBlock, endBlock));
      console.log(blocks);
    };

    fetchAPI();
  }, [currentPage]);

  // Get current blocks
  const indexOfLastBlock = currentPage * blocksPerPage;
  const indexOfFirstBlock = indexOfLastBlock - blocksPerPage;
  const currentBlocks = blocks && blocks.slice(indexOfFirstBlock, indexOfLastBlock);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Wrapper>
      <h1>Latest Blocks</h1>
      {blocks && (
        <>
          <BlockListWrapper>
            {currentBlocks.map((block) => (
              <Link to={`/block/${block.hash}`} key={block.hash}>
                <BlockListItem block={block} />
              </Link>
            ))}
          </BlockListWrapper>
          {blocks.length > 0 && (
            <Pagination
              blocksPerPage={blocksPerPage}
              totalBlocks={blocks.length}
              paginate={paginate}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default BlockList;
