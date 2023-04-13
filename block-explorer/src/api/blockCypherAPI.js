import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const fetchBlock = async (blockHash) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rawblock/${blockHash}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTransaction = async (txHash) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rawtx/${txHash}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAddress = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rawaddr/${address}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchLatestBlock = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/latestblock`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchBlocks = async (page = 0) => {
    try {
        // const response = await axios.get(`${API_BASE_URL}/blocks/$time_in_milliseconds?limit=10`); change time_in_milliseconds to NOW

        const response = await axios.get(`${API_BASE_URL}/blocks/$1681380000?format=json`);
        return response.data;
    } catch (error) {

    }
}

export const fetchBlocksInRange = async (startBlock, endBlock) => {
    try {
      const blocks = [];
      for (let blockHeight = startBlock; blockHeight <= endBlock; blockHeight++) {
        const response = await axios.get(`${API_BASE_URL}/rawblock-height/${blockHeight}?format=json`);
        blocks.push(response.data);
      }
      return blocks;
    } catch (error) {
      console.error(error);
    } 
  };