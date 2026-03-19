document.getElementById("analysisForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const ticker = document.getElementById("ticker").value.toUpperCase();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const apiKey = "o96BmVE3B2u1You8VJZgaMWwS5UD9NVR";

    try {
        // Fetch stock data
        const stockResponse = await fetch(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${apiKey}`
        );
        const stockData = await stockResponse.json();
        console.log("Stock Data:", stockData);

        // Fetch S&P 500 data
        const marketResponse = await fetch(
            `https://financialmodelingprep.com/api/v3/historical-price-full/%5EGSPC?apikey=${apiKey}`
        );
        const marketData = await marketResponse.json();
        console.log("Market Data:", marketData);

        // Extract historical arrays
      if (!stockData.historical || !marketData.historical) {
    console.log("Stock Data:", stockData);
    console.log("Market Data:", marketData);
    alert("Error: Could not retrieve data. Check console.");
    return;
}

if (!stockData.historical || !marketData.historical) {
    console.log("Stock Data:", stockData);
    console.log("Market Data:", marketData);
    alert("Error: Could not retrieve data. Check console.");
    return;
}

let stockPrices = stockData.historical;
let marketPrices = marketData.historical;

        // Filter by date range
        stockPrices = stockPrices.filter(d => d.date >= startDate && d.date <= endDate);
        marketPrices = marketPrices.filter(d => d.date >= startDate && d.date <= endDate);

        // Sort ascending (important)
        stockPrices.sort((a, b) => new Date(a.date) - new Date(b.date));
        marketPrices.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Extract closing prices
        const stockCloses = stockPrices.map(d => d.close);
        const marketCloses = marketPrices.map(d => d.close);

        // Calculate daily returns
        function calculateReturns(prices) {
            let returns = [];
            for (let i = 1; i < prices.length; i++) {
                returns.push((prices[i] / prices[i - 1]) - 1);
            }
            return returns;
        }

        const stockReturns = calculateReturns(stockCloses);
        const marketReturns = calculateReturns(marketCloses);

        console.log("Stock Returns:", stockReturns);
        console.log("Market Returns:", marketReturns);

        alert("Returns calculated! Check console.");

    } catch (error) {
        console.error("Error:", error);
        alert("Error fetching or processing data.");
    }
});
