import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;
  background-color: #020202;
  color: #fff;
  width: 100%;
  height: 100vh;
`;

const ChatArea = styled.div`
  overflow-y: auto;
  height: 55vh; // Adjust based on your desired chat window height
  width: 100%;
  display: flex;
  flex-direction: column-reverse; // To keep latest messages at the bottom
`;

const Message = styled.div`
  background-color: #202020;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  color: #fff;
  max-width: 80%;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TimeStamp = styled.span`
  color: #999;
  font-size: 0.8em;
`;

const Attachment = styled.a`
  display: block;
  color: #ff6700;
  margin-top: 10px;
  text-decoration: none;
`;

const InputArea = styled.div`
  position: fixed;
  bottom: 20px;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #000;
  height: 50px; // Define height here
  padding: 5px;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex-grow: 1;
  border-radius: 10px;
  border: none;
  padding: 10px;
  margin-right: 10px;
`;

const Button = styled.button`
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  background-color: #ff6700;
  color: #fff;
`;

const UserMessage = styled(Message)`
  background-color: white;
  align-self: flex-end;
  color: #000;
`;



const ChatComponent = () => {
    const dummyMessages = [
        {
          user: "Alice_BTC",
          time: "09:00 AM",
          content: "Good day, folks! Has anyone noticed the recent spike in Bitcoin price?",
          attachment: null,
        },
        {
          user: "Crypto_Bob",
          time: "09:01 AM",
          content: "Hi Alice_BTC! Yes, it seems BTC is gaining some solid ground after a long time.",
          attachment: null 
        },
        {
          user: "Satoshi_Nakam",
          time: "09:02 AM",
          content: "Indeed, here's an interesting article on this recent surge.",
          attachment: "www.coindesk.com/bitcoin-price-surge",
        },
        {
          user: "Blockchain_Billy",
          time: "09:03 AM",
          content: "The adoption by big corporations is finally starting to influence the price, I guess.",
          attachment: null,
        },
        {
          user: "HODL_Harry",
          time: "09:04 AM",
          content: "Just another day for the HODLers. Keep holding, folks!",
          attachment: "www.hodlgang.com/long_term_btc",
        },
        {
          user: "Miner_Mike",
          time: "09:05 AM",
          content: "Haha, HODL_Harry! Mining has become profitable again with this surge.",
          attachment: null,
        },
        {
          user: "Decentral_Dan",
          time: "09:06 AM",
          content: "I believe the main factor is the growing understanding and acceptance of the decentralized nature of Bitcoin.",
          attachment: null,
        },
        {
          user: "Satoshi_Sammy",
          time: "09:07 AM",
          content: "Decentral_Dan, completely agree. Here's a paper explaining decentralization and Bitcoin.",
          attachment: "www.bitcoinpapers.com/decentralization-explained",
        },
        {
          user: "Crypto_Carl",
          time: "09:08 AM",
          content: "I just hope this isn't another bubble. Remember 2017, anyone?",
          attachment: null,
        },
        {
          user: "Trader_Tina",
          time: "09:09 AM",
          content: "Crypto_Carl, good point. Let's not forget to trade wisely.",
          attachment: "www.tradewisely.com/crypto-risk-management",
        },
        {
          user: "Alice_BTC",
          time: "09:10 AM",
          content: "Is anyone into BTC futures trading? I'd like some insight.",
          attachment: null,
        },
        {
          user: "Trader_Tina",
          time: "09:11 AM",
          content: "Alice_BTC, sure thing! Here's a beginners guide to futures trading.",
          attachment: "www.tradewisely.com/btc-futures-guide",
        },
        {
          user: "Miner_Mike",
          time: "09:12 AM",
          content: "I've noticed an increase in the hash rate recently. Any thoughts?",
          attachment: null,
        },
        {
          user: "Crypto_Bob",
          time: "09:13 AM",
          content: "Miner_Mike, that could be due to more miners joining the network given the price surge.",
          attachment: null,
        },
        {
          user: "Satoshi_Sammy",
          time: "09:14 AM",
          content: "Just to mention, I've started a thread about Bitcoin's energy consumption. Let's continue there?",
          attachment: "www.forumlink.com/bitcoin-energy-consumption",
        },
        {
          user: "Decentral_Dan",
          time: "09:15 AM",
          content: "Great, Satoshi_Sammy! That's an important topic to discuss.",
          attachment: null,
        },
        {
          user: "HODL_Harry",
          time: "09:16 AM",
          content: "Hey, guys! How's Lightning Network going? Any experience?",
          attachment: null,
        },
        {
          user: "Blockchain_Billy",
          time: "09:17 AM",
          content: "Lightning Network is doing great. Speeding up transactions and reducing fees.",
          attachment: null,
        },
        {
          user: "Crypto_Carl",
          time: "09:18 AM",
          content: "Do you guys think the bull run will last?",
          attachment: null,
        },
        {
          user: "Trader_Tina",
          time: "09:19 AM",
          content: "Hard to predict, Crypto_Carl. Just be prepared for any situation.",
          attachment: null,
        },
        {
          user: "Alice_BTC",
          time: "09:20 AM",
          content: "I think it's important to diversify investments, not just in Bitcoin but other cryptos as well.",
          attachment: null,
        },
        {
          user: "Crypto_Bob",
          time: "09:21 AM",
          content: "Alice_BTC, wise words. A balanced portfolio is key.",
          attachment: null,
        },
        {
          user: "Satoshi_Nakam",
          time: "09:22 AM",
          content: "Anyone has thoughts about Bitcoin vs. Bitcoin Cash?",
          attachment: null,
        },
        {
          user: "Blockchain_Billy",
          time: "09:23 AM",
          content: "Bitcoin Cash has its advantages but Bitcoin is the original and still the most widely accepted.",
          attachment: null,
        },
        {
          user: "HODL_Harry",
          time: "09:24 AM",
          content: "HODLing both, just in case!",
          attachment: null,
        },
        {
          user: "Miner_Mike",
          time: "09:25 AM",
          content: "Mining Bitcoin Cash is easier, but it's less profitable compared to Bitcoin.",
          attachment: null,
        },
        {
          user: "Decentral_Dan",
          time: "09:26 AM",
          content: "Don't forget that Bitcoin has much stronger network effects.",
          attachment: null,
        },
        {
          user: "Satoshi_Sammy",
          time: "09:27 AM",
          content: "Here's an article comparing Bitcoin and Bitcoin Cash. It might be helpful.",
          attachment: "www.coindesk.com/bitcoin-vs-bitcoin-cash",
        },
        {
          user: "Crypto_Carl",
          time: "09:28 AM",
          content: "I believe the market will eventually decide which one has more value.",
          attachment: null,
        },
        {
          user: "Trader_Tina",
          time: "09:29 AM",
          content: "Exactly, Crypto_Carl. And that's why we need to be vigilant about market trends.",
          attachment: null,
        },
    ];
    

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [dummyMessages]);

  return (
    <Container>
      <InputArea>
        <Input type="text" />
        <Button>Send</Button>
      </InputArea>
      <ChatArea>
        <div ref={messagesEndRef} />
        {dummyMessages
          .slice(0)
          .reverse()
          .map((msg, index) =>
            msg.user === "Satoshi_Nakam" ? (
              <UserMessage key={index}>
                <UserName>
                  {msg.user} <TimeStamp>{msg.time}</TimeStamp>
                </UserName>
                <div>{msg.content}</div>
                {msg.attachment && (
                  <Attachment href={msg.attachment}>Attachment</Attachment>
                )}
              </UserMessage>
            ) : (
              <Message key={index}>
                <UserName>
                  {msg.user} <TimeStamp>{msg.time}</TimeStamp>
                </UserName>
                <div>{msg.content}</div>
                {msg.attachment && (
                  <Attachment href={msg.attachment}>Attachment</Attachment>
                )}
              </Message>
            )
          )}
      </ChatArea>
    </Container>
  );
};

export default ChatComponent;
