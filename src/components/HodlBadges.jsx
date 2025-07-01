import React from 'react';
import styled from 'styled-components';
import { Trophy, Flame, Diamond, Crown, Star, Zap, Shield, Target, TrendingUp } from 'lucide-react';
import { formatDuration } from '../utils/api';

const BadgesContainer = styled.div`
  text-align: center;
`;

const BadgesTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ffd700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Badge = styled.div`
  background: ${props => props.$background || 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 237, 78, 0.1))'};
  border: 2px solid ${props => props.$border || 'rgba(255, 215, 0, 0.5)'};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(255, 215, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const BadgeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.$color || '#ffd700'};
`;

const BadgeTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: ${props => props.color || 'white'};
`;

const BadgeDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
  line-height: 1.4;
`;

const BadgeValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0.5rem;
  color: ${props => props.color || '#ffd700'};
`;

const UnlockedBadge = styled(Badge)`
  opacity: 1;
  animation: badgeUnlock 0.6s ease-out;
  
  @keyframes badgeUnlock {
    0% {
      transform: scale(0.8) rotate(-5deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.1) rotate(2deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }
`;

const LockedBadge = styled(Badge)`
  opacity: 0.4;
  filter: grayscale(1);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: none;
    box-shadow: none;
  }
`;

const LockedOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const HodlBadges = ({ data }) => {
  const durationDays = Math.floor(data.duration / (1000 * 60 * 60 * 24));
  const durationYears = durationDays / 365;
  const profitPercentage = data.profitLoss;

  const badges = [
    {
      id: 'hodler',
      title: 'Hodler',
      description: 'Started your Bitcoin journey',
      icon: <Shield size={48} />,
      unlocked: true,
      color: '#4CAF50',
      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1))',
      border: 'rgba(76, 175, 80, 0.5)'
    },
    {
      id: 'week',
      title: 'Week Warrior',
      description: 'Hodled for a week',
      icon: <Target size={48} />,
      unlocked: durationDays >= 7,
      color: '#2196F3',
      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.1))',
      border: 'rgba(33, 150, 243, 0.5)',
      requirement: '7 days'
    },
    {
      id: 'month',
      title: 'Monthly Master',
      description: 'Hodled for a month',
      icon: <Star size={48} />,
      unlocked: durationDays >= 30,
      color: '#9C27B0',
      background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.2), rgba(156, 39, 176, 0.1))',
      border: 'rgba(156, 39, 176, 0.5)',
      requirement: '30 days'
    },
    {
      id: 'year',
      title: 'Yearly Legend',
      description: 'Hodled for a year',
      icon: <Crown size={48} />,
      unlocked: durationYears >= 1,
      color: '#FF9800',
      background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 152, 0, 0.1))',
      border: 'rgba(255, 152, 0, 0.5)',
      requirement: '1 year'
    },
    {
      id: 'diamond',
      title: 'Diamond Hands',
      description: 'Hodled through volatility',
      icon: <Diamond size={48} />,
      unlocked: durationDays >= 100,
      color: '#E91E63',
      background: 'linear-gradient(135deg, rgba(233, 30, 99, 0.2), rgba(233, 30, 99, 0.1))',
      border: 'rgba(233, 30, 99, 0.5)',
      requirement: '100 days'
    },
    {
      id: 'profit',
      title: 'Profit Maker',
      description: 'Made profit on your hodl',
      icon: <TrendingUp size={48} />,
      unlocked: profitPercentage > 0,
      color: '#4CAF50',
      background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1))',
      border: 'rgba(76, 175, 80, 0.5)',
      value: profitPercentage > 0 ? `+${profitPercentage.toFixed(1)}%` : null
    },
    {
      id: 'ath',
      title: 'ATH Survivor',
      description: 'Hodled through ATH',
      icon: <Flame size={48} />,
      unlocked: data.athPrice > data.currentPrice,
      color: '#FF5722',
      background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.2), rgba(255, 87, 34, 0.1))',
      border: 'rgba(255, 87, 34, 0.5)',
      value: data.athPrice > data.currentPrice ? `${((data.athPrice - data.currentPrice) / data.currentPrice * 100).toFixed(1)}% from ATH` : null
    },
    {
      id: 'longterm',
      title: 'Long-term Hodler',
      description: 'Hodled for multiple years',
      icon: <Trophy size={48} />,
      unlocked: durationYears >= 3,
      color: '#FFD700',
      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
      border: 'rgba(255, 215, 0, 0.5)',
      requirement: '3 years'
    }
  ];

  const unlockedCount = badges.filter(badge => badge.unlocked).length;

  return (
    <BadgesContainer>
      <BadgesTitle>
        <Trophy size={24} />
        Your Hodl Badges ({unlockedCount}/{badges.length})
      </BadgesTitle>
      
      <BadgesGrid>
        {badges.map((badge) => {
          const BadgeComponent = badge.unlocked ? UnlockedBadge : LockedBadge;
          
          return (
            <BadgeComponent
              key={badge.id}
              $background={badge.background}
              $border={badge.border}
            >
              <BadgeIcon $color={badge.color}>
                {badge.icon}
              </BadgeIcon>
              
              <BadgeTitle color={badge.color}>
                {badge.title}
              </BadgeTitle>
              
              <BadgeDescription>
                {badge.description}
              </BadgeDescription>
              
              {badge.value && (
                <BadgeValue color={badge.color}>
                  {badge.value}
                </BadgeValue>
              )}
              
              {!badge.unlocked && badge.requirement && (
                <LockedOverlay>
                  Requires: {badge.requirement}
                </LockedOverlay>
              )}
            </BadgeComponent>
          );
        })}
      </BadgesGrid>
      
      <div style={{ 
        fontSize: '0.9rem', 
        opacity: 0.7,
        marginTop: '1rem'
      }}>
        <p>Keep hodling to unlock more badges! 💎🙌</p>
      </div>
    </BadgesContainer>
  );
};

export default HodlBadges; 