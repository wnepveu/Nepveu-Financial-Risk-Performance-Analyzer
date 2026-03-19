// -----------------------------
// Full script.js for Financial Analyzer
// -----------------------------

const BASE_URL = "https://nepveufinancialrisk-1m8b7g0y8-wnepveus-projects.vercel.app/api/data";
const RISK_FREE_RATE = 0.04; // 4% annual risk-free rate

document.getElementById("analysisForm").addEventListener("submit", async function(event) { 
    event.preventDefault();

    const ticker = document.getElementById("ticker").value.toUpperCase();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    try {
        // Fetch stock & market data from backend
        const response = await fetch(`${BASE_URL}?ticker=${ticker}`);
        const data = await response.json();

        let stockPrices = data.stock.historical;
        let marketPrices = data.market.historical;

        // Filter by date range
        stockPrices = stockPrices.filter(d => d.date >= startDate && d.date <= endDate);
        marketPrices = marketPrices.filter(d => d.date >= startDate && d.date <= endDate);

        // Check if data exists
        if (stockPrices.length === 0 || marketPrices.length === 0) {
            alert("No data available for selected date range.");
            return;
        }

        // Sort oldest → newest
        stockPrices.sort((a, b) => new Date(a.date) - new Date(b.date));
        marketPrices.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Extract closing prices
        const stockCloses = stockPrices.map(d => d.close);
        const marketCloses = marketPrices.map(d => d.close);

        // -----------------------------
        // Helper Functions
        // -----------------------------
        function calculateReturns(prices) {
            let returns = [];
            for (let i = 1; i < prices.length; i++) {
                returns.push((prices[i] / prices[i - 1]) - 1);
            }
            return returns;
        }

        function holdingPeriodReturn(prices) {
            return (prices[prices.length - 1] - prices[0]) / prices[0];
        }

        function annualizedReturn(hpr, numDays) {
            return Math.pow(1 + hpr, 252 / numDays) - 1;
        }

        function standardDeviation(array) {
            const mean = array.reduce((a, b) => a + b, 0) / array.length;
            const squaredDiffs = array.map(x => Math.pow(x - mean, 2));
            return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / (array.length - 1));
        }

        function sharpeRatio(annReturn, volatility) {
            return (annReturn - RISK_FREE_RATE) / volatility;
        }

        // -----------------------------
        // Calculations
        // -----------------------------
        const stockReturns = calculateReturns(stockCloses);
        const marketReturns = calculateReturns(marketCloses);

        const hpr = holdingPeriodReturn(stockCloses);
        const annReturn = annualizedReturn(hpr, stockReturns.length);
        const volatility = standardDeviation(stockReturns) * Math.sqrt(252);
        const sharpe = sharpeRatio(annReturn, volatility);

        // -----------------------------
        // Console Output
        // -----------------------------
        console.log("Ticker:", ticker);
        console.log("Stock Returns:", stockReturns);
        console.log("Market Returns:", marketReturns);
        console.log("Holding Period Return:", hpr);
        console.log("Annualized Return:", annReturn);
        console.log("Annualized Volatility:", volatility);
        console.log("Sharpe Ratio:", sharpe);

        alert("Calculations complete! Check the console for results.");

    } catch (error) {
        console.error("Error:", error);
        alert("Error fetching or processing data.");
    }
});
