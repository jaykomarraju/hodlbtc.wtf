import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(90deg, #F7931A 0%, #FFD700 100%);
  padding: 2rem 0;
  text-align: center;
  box-shadow: 0 4px 20px rgba(247, 147, 26, 0.3);
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 900;
  color: #1a1a1a;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
`;

const Tagline = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1.2rem;
  color: #1a1a1a;
  font-weight: 600;
  opacity: 0.9;
`;

const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const MarkdownContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  h1 {
    color: #F7931A;
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  h2 {
    color: #FFD700;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 2.5rem 0 1rem 0;
    border-bottom: 2px solid #F7931A;
    padding-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: #e0e0e0;
  }

  ul {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }

  li {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
  }

  strong {
    color: #F7931A;
    font-weight: 700;
  }

  em {
    color: #FFD700;
    font-style: italic;
  }

  hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, #F7931A, #FFD700);
    margin: 3rem 0;
    border-radius: 1px;
  }

  blockquote {
    border-left: 4px solid #F7931A;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #b0b0b0;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: #888;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 3rem;
`;

const markdownContent = `# HODL BITCOIN: Why Holding is a Winning Strategy

In the volatile world of cryptocurrency, few terms are as iconic as "HODL." Born from a misspelling in a 2013 forum post, "HODL" (Hold On for Dear Life) has become a battle cry for Bitcoin believers everywhere. But what does it actually mean to "HODL Bitcoin," and why has this philosophy proven so resilient—even rewarding—for so many?

## The Origins of HODL

The word "HODL" was first coined during a brutal Bitcoin price dip. As panic gripped the markets, a user posted: "I AM HODLING." The typo stuck, and soon after, HODL evolved into a badge of honor for those with the nerve to ride out wild price swings.

## The HODL Philosophy

At its core, HODLing means resisting the urge to sell, no matter how turbulent the market becomes. Unlike day traders who try to time highs and lows, HODLers commit to a long-term vision. They believe Bitcoin is a revolutionary store of value—"digital gold"—that will increase in worth as adoption spreads and fiat currencies are debased by inflation.

## Why HODL Works

* **Historical Performance**: Data doesn't lie. Long-term Bitcoin holders have, time and again, outperformed short-term traders. Even with massive volatility, each Bitcoin cycle has rewarded patient holders.
* **Market Volatility**: Crypto's extreme price swings often flush out weak hands. HODLers avoid emotional decisions and let time do the heavy lifting.
* **Scarcity**: With only 21 million BTC ever to exist, scarcity is built in. Over time, increasing demand and diminishing supply favor those who hold.

## The Challenges

HODLing isn't easy. It demands psychological resilience as prices can drop 50% or more overnight. The temptation to sell—especially during bear markets or FOMO-driven bull runs—is ever-present. True HODLers understand that real wealth in Bitcoin comes from patience, not panic.

## Conclusion

"HODL Bitcoin" isn't just a meme—it's a proven strategy for those who believe in the technology and its future. In a space where fortunes are made and lost in seconds, sometimes the best action is no action at all. If you believe in Bitcoin's long-term promise, hold on for dear life.

---

*Disclaimer: This article is for informational purposes only and not financial advice. Always do your own research before investing.*`;

function App() {
  return (
    <AppContainer>
      <Header>
        <Logo>HODLBTC.WTF</Logo>
        <Tagline>The Ultimate Bitcoin HODL Guide</Tagline>
      </Header>
      
      <MainContent>
        <MarkdownContainer>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </MarkdownContainer>
      </MainContent>
      
      <Footer>
        <p>© 2024 HODLBTC.WTF - HODL Strong, HODL Long</p>
      </Footer>
    </AppContainer>
  );
}

export default App;
