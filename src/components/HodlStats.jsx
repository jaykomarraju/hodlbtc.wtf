import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, DollarSign, TrendingUp, TrendingDown, Clock, Bitcoin } from 'lucide-react';
import { formatCurrency, formatPercentage, formatDuration } from '../utils/api';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color || 'rgba(255, 215, 0, 0.2)'};
  color: ${props => props.$iconColor || '#ffd700'};
`;

const StatTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.color || 'white'};
`;

const StatSubtext = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
  line-height: 1.4;
`;

const LiveCounter = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffd700;
  text-align: center;
  margin: 2rem 0;
  font-family: 'Monaco', 'Menlo', monospace;
`;

const ComparisonSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ComparisonTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #ffd700;
  text-align: center;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ComparisonCard = styled.div`
  background: ${props => props.$background || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  padding: 1.25rem;
  text-align: center;
  border: 1px solid ${props => props.$border || 'rgba(255, 255, 255, 0.2)'};
`;

const ComparisonLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const ComparisonValue = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.color || 'white'};
  margin-bottom: 0.25rem;
`;

const ComparisonDiff = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color || 'rgba(255, 255, 255, 0.7)'};
`;

const HodlStats = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentDuration = currentTime - data.hodlStartDate.getTime();
  const athDifference = data.athValue - data.currentValue;
  const athPercentage = ((data.athPrice - data.currentPrice) / data.currentPrice) * 100;

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#ffd700', fontSize: '2rem' }}>
        Your Hodl Journey
      </h2>

      <LiveCounter>
        {formatDuration(currentDuration)}
      </LiveCounter>

      <StatsContainer>
        <StatCard>
          <StatHeader>
            <StatIcon>
              <Calendar size={20} />
            </StatIcon>
            <StatTitle>Hodl Start Date</StatTitle>
          </StatHeader>
          <StatValue>
            {data.hodlStartDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </StatValue>
          <StatSubtext>
            Your Bitcoin journey began on this day
          </StatSubtext>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon>
              <Bitcoin size={20} />
            </StatIcon>
            <StatTitle>Bitcoin Held</StatTitle>
          </StatHeader>
          <StatValue>
            {data.totalBtc.toFixed(8)} BTC
          </StatValue>
          <StatSubtext>
            Total Bitcoin in this address
          </StatSubtext>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon $color="rgba(76, 175, 80, 0.2)" $iconColor="#4CAF50">
              <DollarSign size={20} />
            </StatIcon>
            <StatTitle>Initial Investment</StatTitle>
          </StatHeader>
          <StatValue color="#4CAF50">
            {formatCurrency(data.initialValue)}
          </StatValue>
          <StatSubtext>
            Value when you started hodling
          </StatSubtext>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon $color="rgba(255, 215, 0, 0.2)" $iconColor="#ffd700">
              <TrendingUp size={20} />
            </StatIcon>
            <StatTitle>Current Value</StatTitle>
          </StatHeader>
          <StatValue color="#ffd700">
            {formatCurrency(data.currentValue)}
          </StatValue>
          <StatSubtext>
            Current market value
          </StatSubtext>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon $color={data.profitLoss >= 0 ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"} 
                      $iconColor={data.profitLoss >= 0 ? "#4CAF50" : "#f44336"}>
              {data.profitLoss >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </StatIcon>
            <StatTitle>Total Return</StatTitle>
          </StatHeader>
          <StatValue color={data.profitLoss >= 0 ? "#4CAF50" : "#f44336"}>
            {formatPercentage(data.profitLoss)}
          </StatValue>
          <StatSubtext>
            {data.profitLoss >= 0 ? 'Profit since hodl start' : 'Loss since hodl start'}
          </StatSubtext>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon $color="rgba(156, 39, 176, 0.2)" $iconColor="#9C27B0">
              <Clock size={20} />
            </StatIcon>
            <StatTitle>Price at Start</StatTitle>
          </StatHeader>
          <StatValue color="#9C27B0">
            {formatCurrency(data.historicalPrice)}
          </StatValue>
          <StatSubtext>
            Bitcoin price when you started
          </StatSubtext>
        </StatCard>
      </StatsContainer>

      <ComparisonSection>
        <ComparisonTitle>What If Scenarios</ComparisonTitle>
        <ComparisonGrid>
          <ComparisonCard 
            $background="rgba(76, 175, 80, 0.1)" 
            $border="rgba(76, 175, 80, 0.3)"
          >
            <ComparisonLabel>If you sold at ATH</ComparisonLabel>
            <ComparisonValue color="#4CAF50">
              {formatCurrency(data.athValue)}
            </ComparisonValue>
            <ComparisonDiff color="#4CAF50">
              +{formatCurrency(athDifference)} more
            </ComparisonDiff>
          </ComparisonCard>

          <ComparisonCard 
            $background="rgba(255, 152, 0, 0.1)" 
            $border="rgba(255, 152, 0, 0.3)"
          >
            <ComparisonLabel>ATH Price</ComparisonLabel>
            <ComparisonValue color="#FF9800">
              {formatCurrency(data.athPrice)}
            </ComparisonValue>
            <ComparisonDiff color="#FF9800">
              {formatPercentage(athPercentage)} higher than current
            </ComparisonDiff>
          </ComparisonCard>

          <ComparisonCard 
            $background="rgba(33, 150, 243, 0.1)" 
            $border="rgba(33, 150, 243, 0.3)"
          >
            <ComparisonLabel>Current Price</ComparisonLabel>
            <ComparisonValue color="#2196F3">
              {formatCurrency(data.currentPrice)}
            </ComparisonValue>
            <ComparisonDiff color="#2196F3">
              Live market price
            </ComparisonDiff>
          </ComparisonCard>
        </ComparisonGrid>
      </ComparisonSection>
    </div>
  );
};

export default HodlStats; 