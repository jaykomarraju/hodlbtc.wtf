const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// const API_BASE_URL = 'https://api.blockcypher.com/v1/btc/main';
const API_BASE_URL = "https://blockstream.info/api/"
const PORT = process.env.PORT || 3001;

// app.get('/rawblock/:blockHash', async (req, res) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/blocks/${req.params.blockHash}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/rawtx/:txHash', async (req, res) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/txs/${req.params.txHash}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/rawaddr/:address', async (req, res) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/addrs/${req.params.address}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/latestblock', async (req, res) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}`);
//     const blockHeight = response.data.height;
//     const latestBlock = await axios.get(`${API_BASE_URL}/blocks/${blockHeight}`);
//     res.json(latestBlock.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/blocks/:timestamp', async (req, res) => {
//   res.status(501).json({ error: 'This endpoint is not supported by the BlockCypher API.' });
// });

// app.get('/rawblock-height/:blockHeight', async (req, res) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/blocks/${req.params.blockHeight}`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.get('tx/:txHash', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tx/${req.params.txHash}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('address/:address', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/address/${req.params.address}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('block/:blockHash', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/block/${req.params.blockHash}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('block/:blockHash/txids', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/block/${req.params.blockHash}/txids`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('blocks/tip/height', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blocks/tip/height`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


