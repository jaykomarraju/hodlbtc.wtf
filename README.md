# 🚀 Hodl BTC - Bitcoin Hodling Tracker

A beautiful web application that tracks your Bitcoin hodling journey and calculates your gains. Find out how long you've been hodling and see your potential profits!

## ✨ Features

### 🎯 Core Features
- **BTC Address Analysis**: Enter any Bitcoin address to analyze its hodling history
- **Hodl Duration Tracking**: Live counter showing exactly how long you've been hodling
- **Performance Statistics**: Calculate initial vs current value and total returns
- **What-If Scenarios**: See what you would have made if you sold at ATH
- **Visual Charts**: Beautiful charts showing your value growth over time
- **Achievement Badges**: Fun meme-style badges based on your hodling milestones
- **Share Functionality**: Generate and download shareable images of your hodl journey

### 🏆 Badge System
- **Hodler**: Started your Bitcoin journey
- **Week Warrior**: Hodled for a week
- **Monthly Master**: Hodled for a month
- **Yearly Legend**: Hodled for a year
- **Diamond Hands**: Hodled through volatility (100+ days)
- **Profit Maker**: Made profit on your hodl
- **ATH Survivor**: Hodled through all-time highs
- **Long-term Hodler**: Hodled for multiple years

### 📊 Analytics
- Real-time hodl duration counter
- Initial investment vs current value
- Total percentage return
- Bitcoin price at hodl start vs current price
- ATH comparison and missed opportunities
- Value growth visualization

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Styled Components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Image Generation**: html2canvas
- **APIs**: 
  - Blockstream API (Bitcoin transaction history)
  - CoinGecko API (Price data)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hodlbtc.wtf.git
   cd hodlbtc.wtf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Usage

1. **Enter Bitcoin Address**: Paste any Bitcoin address in the input field
2. **Analyze**: Click "Analyze Hodl" to fetch transaction history
3. **View Results**: See your hodling statistics, charts, and badges
4. **Share**: Download images or share your journey on social media

### Example Addresses
Try these example addresses to test the app:
- `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` (Genesis block address)
- `bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh` (Segwit address)
- `3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy` (P2SH address)

## 🔧 API Integration

### Bitcoin Transaction History
Uses Blockstream's public API:
```
GET https://blockstream.info/api/address/{address}/txs
```

### Price Data
Uses CoinGecko's free API:
- Current price: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
- Historical price: `https://api.coingecko.com/api/v3/coins/bitcoin/history?date={dd-mm-yyyy}`
- ATH data: `https://api.coingecko.com/api/v3/coins/bitcoin`

## 🎨 Design Features

- **Dark Theme**: Beautiful dark gradient background
- **Glassmorphism**: Modern glass-like card effects
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Animations**: Hover effects and transitions
- **Live Updates**: Real-time duration counter
- **Custom Scrollbar**: Themed scrollbar design

## 📊 Data Privacy

- **No Data Storage**: All analysis happens client-side
- **No Personal Data**: Only public blockchain data is accessed
- **Privacy First**: Your Bitcoin addresses are never stored

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Blockstream** for the Bitcoin transaction API
- **CoinGecko** for the price data API
- **Bitcoin Community** for the hodl culture inspiration
- **React & Vite** for the amazing development experience

## 🐛 Known Issues

- Historical price data may be approximate for very old transactions
- Some addresses with complex transaction histories may take longer to analyze
- Image generation requires modern browsers with canvas support

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the browser console for error messages
- Ensure you're using a supported browser

---

**Keep hodling! 💎🙌**

*"Bitcoin is not just a currency, it's a revolution."*
