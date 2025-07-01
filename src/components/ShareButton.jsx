import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Share2, Download, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { formatCurrency, formatPercentage, formatDuration } from '../utils/api';

const ShareContainer = styled.div`
  text-align: center;
`;

const ShareTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ffd700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const ShareButton = styled.button`
  padding: 1rem 2rem;
  background: ${props => props.$variant === 'primary' ? 'linear-gradient(45deg, #ffd700, #ffed4e)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.$variant === 'primary' ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  color: ${props => props.$variant === 'primary' ? '#1a1a2e' : 'white'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ShareableCard = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  border: 3px solid rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const CardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CardSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
`;

const DurationDisplay = styled.div`
  text-align: center;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  border: 2px solid rgba(255, 215, 0, 0.3);
`;

const DurationValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #ffd700;
  font-family: 'Monaco', 'Menlo', monospace;
  margin-bottom: 0.5rem;
`;

const DurationLabel = styled.div`
  font-size: 1rem;
  opacity: 0.8;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.7;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
  font-size: 1.2rem;
`;

const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.5);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #4CAF50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ShareButtonComponent = ({ data }) => {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const generateImage = async () => {
    if (!cardRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `hodl-journey-${data.address.slice(0, 8)}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      setSuccessMessage('Image downloaded successfully!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating image:', error);
      setSuccessMessage('Failed to generate image. Please try again.');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    const text = `🚀 My Bitcoin Hodl Journey

⏱️ Duration: ${formatDuration(data.duration)}
💰 Initial Value: ${formatCurrency(data.initialValue)}
💎 Current Value: ${formatCurrency(data.currentValue)}
📈 Return: ${formatPercentage(data.profitLoss)}

Check out hodlbtc.wtf to track your own hodl journey! 💎🙌`;

    try {
      await navigator.clipboard.writeText(text);
      setSuccessMessage('Copied to clipboard!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setSuccessMessage('Failed to copy to clipboard');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const shareOnTwitter = () => {
    const text = `🚀 I've been hodling Bitcoin for ${formatDuration(data.duration)}! 💎🙌\n\nInitial: ${formatCurrency(data.initialValue)}\nCurrent: ${formatCurrency(data.currentValue)}\nReturn: ${formatPercentage(data.profitLoss)}\n\nTrack your hodl journey at hodlbtc.wtf`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <ShareContainer>
      <ShareTitle>
        <Share2 size={24} />
        Share Your Hodl Journey
      </ShareTitle>

      <ShareButtons>
        <ShareButton $variant="primary" onClick={generateImage} disabled={isGenerating}>
          <Download size={18} />
          Download Image
        </ShareButton>
        
        <ShareButton onClick={copyToClipboard}>
          <Copy size={18} />
          Copy Text
        </ShareButton>
        
        <ShareButton onClick={shareOnTwitter}>
          <Share2 size={18} />
          Share on Twitter
        </ShareButton>
      </ShareButtons>

      {showSuccess && (
        <SuccessMessage>
          <Check size={18} />
          {successMessage}
        </SuccessMessage>
      )}

      <ShareableCard ref={cardRef}>
        <CardHeader>
          <CardTitle>🚀 Hodl Journey</CardTitle>
          <CardSubtitle>Bitcoin Hodling Achievement</CardSubtitle>
        </CardHeader>

        <DurationDisplay>
          <DurationValue>
            {formatDuration(data.duration)}
          </DurationValue>
          <DurationLabel>Time Hodling</DurationLabel>
        </DurationDisplay>

        <StatsGrid>
          <StatItem>
            <StatLabel>Initial Investment</StatLabel>
            <StatValue>{formatCurrency(data.initialValue)}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Current Value</StatLabel>
            <StatValue>{formatCurrency(data.currentValue)}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Total Return</StatLabel>
            <StatValue>{formatPercentage(data.profitLoss)}</StatValue>
          </StatItem>
          
          <StatItem>
            <StatLabel>Bitcoin Held</StatLabel>
            <StatValue>{data.totalBtc.toFixed(8)} BTC</StatValue>
          </StatItem>
        </StatsGrid>

        <Footer>
          Generated with hodlbtc.wtf • Keep hodling! 💎🙌
        </Footer>
      </ShareableCard>

      {isGenerating && (
        <LoadingOverlay>
          <div>Generating your hodl image...</div>
        </LoadingOverlay>
      )}
    </ShareContainer>
  );
};

export default ShareButtonComponent; 