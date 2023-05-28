import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Header from './components/Header';
// import Footer from './components/Footer';
// import BlockList from './components/BlockList';
// import BlockDetails from './components/BlockDetails';
// import TransactionList from './components/TransactionList';
// import TransactionDetails from './components/TransactionDetails';
// import AddressDetails from './components/AddressDetails';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SuperUser from './pages/SuperUser';
import BlockPage from './pages/BlockPage';
import Search from './pages/Search';
import Chat from './pages/Chat';

const Appi = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  main {
    flex: 1;
  }
`;


function App() {
  return (
    <Router>
      <Appi className="App">
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<SuperUser />} />
            <Route path="/blocks" element={<BlockPage />} />
            <Route path="/hash" element={<Search />} />
            <Route path="/block/:blockHash" element={<BlockPage />} />
            <Route path="/transaction/:txHash" element={<BlockPage />} />
            <Route path="/address/:addressHash" element={<BlockPage />} />
            <Route path="/chat" element={<Chat />} />

            {/* <Route path="/blocks" element={<BlockList />} />
            <Route path="/block/:blockHash" element={<BlockDetails />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/transaction/:txHash" element={<TransactionDetails />} />
            <Route path="/address/:addressHash" element={<AddressDetails />} /> */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </Appi>
    </Router>
  );
}

export default App;
