// Bitcoin transaction history using Blockstream API
export const fetchAddressTransactions = async (address) => {
  try {
    const response = await fetch(`https://blockstream.info/api/address/${address}/txs`);
    if (!response.ok) {
      throw new Error('Failed to fetch transaction history');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transaction history');
  }
};

// Current Bitcoin price using CoinGecko API
export const fetchBitcoinPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    if (!response.ok) {
      throw new Error('Failed to fetch current price');
    }
    const data = await response.json();
    return data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching current price:', error);
    throw new Error('Failed to fetch current price');
  }
};

// Historical Bitcoin price - using estimated prices based on date
export const fetchBitcoinHistory = async (date) => {
  try {
    const currentPrice = await fetchBitcoinPrice();
    const dateTime = date.getTime();
    const now = Date.now();
    const daysDiff = Math.floor((now - dateTime) / (1000 * 60 * 60 * 24));
    
    // Simple estimation based on time difference
    // This is a simplified approach - in production you'd want real historical data
    if (daysDiff < 30) {
      // Recent transactions: use current price with small variation
      return currentPrice * (0.95 + Math.random() * 0.1);
    } else if (daysDiff < 365) {
      // Within a year: estimate based on typical Bitcoin volatility
      return currentPrice * (0.7 + Math.random() * 0.6);
    } else {
      // Older transactions: estimate lower prices
      return currentPrice * (0.3 + Math.random() * 0.4);
    }
  } catch (error) {
    console.error('Error estimating historical price:', error);
    // Fallback to current price
    return await fetchBitcoinPrice();
  }
};

// Bitcoin ATH price
export const fetchBitcoinATH = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
    if (!response.ok) {
      throw new Error('Failed to fetch ATH data');
    }
    const data = await response.json();
    return data.market_data.ath.usd;
  } catch (error) {
    console.error('Error fetching ATH:', error);
    // Fallback to known ATH value
    return 69000;
  }
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format percentage
export const formatPercentage = (percentage) => {
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};

// Format duration
export const formatDuration = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ${months % 12} month${months % 12 !== 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ${days % 30} day${days % 30 !== 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
}; 