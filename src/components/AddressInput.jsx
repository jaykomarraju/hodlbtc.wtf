import React, { useState } from 'react';
import styled from 'styled-components';
import { Bitcoin, Search } from 'lucide-react';

const InputContainer = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #ffd700;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const InputForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  font-family: 'Monaco', 'Menlo', monospace;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #ffd700;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  }
`;

const BitcoinIcon = styled(Bitcoin)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #ffd700;
  opacity: 0.7;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  border: none;
  border-radius: 12px;
  color: #1a1a2e;
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
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ExampleAddresses = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const ExampleTitle = styled.h4`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.7;
`;

const ExampleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const ExampleButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Monaco', 'Menlo', monospace;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const AddressInput = ({ onAnalyze }) => {
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Basic Bitcoin address validation
  const validateAddress = (addr) => {
    // Basic regex for Bitcoin addresses (legacy, segwit, and native segwit)
    const btcRegex = /^(bc1|[13])[a-km-zA-HJ-NP-Z1-9]{25,39}$/;
    return btcRegex.test(addr);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value.trim();
    setAddress(value);
    setIsValid(validateAddress(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && address) {
      onAnalyze(address);
    }
  };

  const handleExampleClick = (exampleAddress) => {
    setAddress(exampleAddress);
    setIsValid(true);
  };

  // Example addresses (these are real Bitcoin addresses for demonstration)
  const exampleAddresses = [
    '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Genesis block address
    'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', // Example segwit address
    '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy' // Example P2SH address
  ];

  return (
    <InputContainer>
      <Title>Enter Your Bitcoin Address</Title>
      <Description>
        Paste your Bitcoin address below to analyze your hodling journey. 
        We'll find when you last received Bitcoin and calculate your gains since then.
      </Description>
      
      <InputForm onSubmit={handleSubmit}>
        <InputWrapper>
          <BitcoinIcon size={20} />
          <Input
            type="text"
            placeholder="Enter Bitcoin address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </InputWrapper>
        <Button type="submit" disabled={!isValid || !address}>
          <Search size={18} />
          Analyze Hodl
        </Button>
      </InputForm>

      <ExampleAddresses>
        <ExampleTitle>Try these example addresses:</ExampleTitle>
        <ExampleList>
          {exampleAddresses.map((addr, index) => (
            <ExampleButton
              key={index}
              onClick={() => handleExampleClick(addr)}
              title={`Example ${index + 1}`}
            >
              {addr.slice(0, 8)}...{addr.slice(-8)}
            </ExampleButton>
          ))}
        </ExampleList>
      </ExampleAddresses>
    </InputContainer>
  );
};

export default AddressInput; 