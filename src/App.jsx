import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bitcoin, TrendingUp, Calendar, DollarSign, Trophy, Share2 } from 'lucide-react';
import AddressInput from './components/AddressInput';
import HodlStats from './components/HodlStats';
import HodlChart from './components/HodlChart';
import HodlBadges from './components/HodlBadges';
import ShareButton from './components/ShareButton';
import { fetchAddressTransactions, fetchBitcoinPrice, fetchBitcoinHistory } from './utils/api';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0 0 0;
  opacity: 0.8;
  font-weight: 300;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.2rem;
  opacity: 0.8;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 59, 48, 0.2);
  border: 1px solid rgba(255, 59, 48, 0.5);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #ff6b6b;
`;

function App() {
  const [address, setAddress] = useState('');
  const [hodlData, setHodlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeAddress = async (btcAddress) => {
    setLoading(true);
    setError('');
    setHodlData(null);

    try {
      // Fetch transaction history
      const transactions = await fetchAddressTransactions(btcAddress);
      
      if (!transactions || transactions.length === 0) {
        throw new Error('No transactions found for this address');
      }

      // Find the last inbound transaction (hodl start)
      const inboundTxs = transactions.filter(tx => 
        tx.vout.some(output => output.scriptpubkey_address === btcAddress)
      );

      if (inboundTxs.length === 0) {
        throw new Error('No inbound transactions found for this address');
      }

      // Sort by timestamp and get the latest
      const lastInbound = inboundTxs.sort((a, b) => b.status.block_time - a.status.block_time)[0];
      const hodlStartDate = new Date(lastInbound.status.block_time * 1000);

      // Check if there are any outbound transactions since the last inbound
      const outboundSince = transactions.filter(tx => 
        tx.vin.some(input => input.prevout.scriptpubkey_address === btcAddress) &&
        tx.status.block_time > lastInbound.status.block_time
      );

      if (outboundSince.length > 0) {
        throw new Error('This address has outbound transactions after the last inbound. Not a pure hodl address.');
      }

      // Calculate total BTC held
      let totalBtc = 0;
      transactions.forEach(tx => {
        tx.vout.forEach(output => {
          if (output.scriptpubkey_address === btcAddress) {
            totalBtc += output.value / 100000000; // Convert satoshis to BTC
          }
        });
        tx.vin.forEach(input => {
          if (input.prevout.scriptpubkey_address === btcAddress) {
            totalBtc -= input.prevout.value / 100000000;
          }
        });
      });

      // Fetch price data
      const currentPrice = await fetchBitcoinPrice();
      const historicalPrice = await fetchBitcoinHistory(hodlStartDate);
      // Use a fixed ATH price, but always take the max of current price and fixed ATH
      const fixedAth = 111814; // Approximate Bitcoin ATH
      const athPrice = Math.max(fixedAth, currentPrice);

      const hodlData = {
        address: btcAddress,
        hodlStartDate,
        totalBtc,
        currentPrice,
        historicalPrice,
        athPrice: athPrice,
        duration: Date.now() - hodlStartDate.getTime(),
        initialValue: totalBtc * historicalPrice,
        currentValue: totalBtc * currentPrice,
        athValue: totalBtc * athPrice,
        profitLoss: (currentPrice - historicalPrice) / historicalPrice * 100
      };

      setHodlData(hodlData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>🚀 How long have YOU been hodling?</Title>
        <Subtitle>Track your Bitcoin hodling journey and see your gains</Subtitle>
      </Header>

      <MainContent>
        <Card>
          <AddressInput onAnalyze={analyzeAddress} />
        </Card>

        {loading && (
          <Card>
            <LoadingSpinner>
              <Bitcoin size={24} style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
              Analyzing your hodl journey...
            </LoadingSpinner>
          </Card>
        )}

        {error && (
          <Card>
            <ErrorMessage>{error}</ErrorMessage>
          </Card>
        )}

        {hodlData && (
          <>
            <Card>
              <HodlStats data={hodlData} />
            </Card>
            
            <Card>
              <HodlChart data={hodlData} />
            </Card>
            
            <Card>
              <HodlBadges data={hodlData} />
            </Card>
            
            <Card>
              <ShareButton data={hodlData} />
            </Card>
          </>
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;
