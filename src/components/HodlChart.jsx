import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/api';

const ChartContainer = styled.div`
  margin: 2rem 0;
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ffd700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ChartWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const LegendDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const CustomTooltip = styled.div`
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  color: white;
  font-size: 0.9rem;
`;

const HodlChart = ({ data }) => {
  // Generate chart data points
  const generateChartData = () => {
    const dataPoints = [];
    const startDate = new Date(data.hodlStartDate);
    const endDate = new Date();
    const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Generate data points for the last 30 days or since hodl start, whichever is shorter
    const maxPoints = Math.min(30, daysDiff);
    const interval = Math.max(1, Math.floor(daysDiff / maxPoints));
    
    for (let i = 0; i <= maxPoints; i += interval) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Calculate approximate value at this point
      // This is a simplified calculation - in a real app you'd fetch historical prices
      const daysSinceStart = i;
      const priceChange = (data.currentPrice - data.historicalPrice) / daysDiff;
      const estimatedPrice = data.historicalPrice + (priceChange * daysSinceStart);
      const estimatedValue = data.totalBtc * estimatedPrice;
      
      dataPoints.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: Math.max(0, estimatedValue),
        price: Math.max(0, estimatedPrice)
      });
    }
    
    return dataPoints;
  };

  const chartData = generateChartData();

  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <p><strong>Date:</strong> {label}</p>
          <p><strong>Value:</strong> {formatCurrency(payload[0].value)}</p>
          <p><strong>Price:</strong> {formatCurrency(payload[0].payload.price)}</p>
        </CustomTooltip>
      );
    }
    return null;
  };

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) {
      return `$${(tickItem / 1000000).toFixed(1)}M`;
    } else if (tickItem >= 1000) {
      return `$${(tickItem / 1000).toFixed(0)}K`;
    }
    return `$${tickItem}`;
  };

  return (
    <ChartContainer>
      <ChartTitle>
        <TrendingUp size={24} />
        Value Growth Over Time
      </ChartTitle>
      
      <ChartWrapper>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffd700" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ffd700" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            
            <XAxis 
              dataKey="date" 
              stroke="rgba(255, 255, 255, 0.6)"
              fontSize={12}
              tickLine={false}
            />
            
            <YAxis 
              stroke="rgba(255, 255, 255, 0.6)"
              fontSize={12}
              tickLine={false}
              tickFormatter={formatYAxis}
            />
            
            <Tooltip content={<CustomTooltipContent />} />
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ffd700"
              strokeWidth={3}
              fill="url(#valueGradient)"
              dot={{ fill: '#ffd700', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ffd700', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrapper>
      
      <Legend>
        <LegendItem>
          <LegendDot color="#ffd700" />
          Portfolio Value
        </LegendItem>
        <LegendItem>
          <LegendDot color="rgba(255, 215, 0, 0.3)" />
          Value Growth
        </LegendItem>
      </Legend>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '1rem', 
        fontSize: '0.9rem', 
        opacity: 0.7 
      }}>
        <p>
          <strong>Initial Value:</strong> {formatCurrency(data.initialValue)} | 
          <strong> Current Value:</strong> {formatCurrency(data.currentValue)} | 
          <strong> Growth:</strong> {((data.currentValue - data.initialValue) / data.initialValue * 100).toFixed(2)}%
        </p>
      </div>
    </ChartContainer>
  );
};

export default HodlChart; 