import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = "https://blockstream.info/api";


export const fetchBlock = async (blockHash) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/block/${blockHash}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchTransaction = async (txHash) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tx/${txHash}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchAddress = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/address/${address}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchLatestBlock = async () => {
  try {
    const latestHash = await axios.get(`${API_BASE_URL}/blocks/tip/hash`);
    const response = await axios.get(`${API_BASE_URL}/block/${latestHash.data}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchLatestBlockHeight = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blocks/tip/height`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchBlocksInRange = async (start, end) => {}

export const fetchTransactionListByBlock = async (blockHash) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/block/${blockHash}/txids`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}