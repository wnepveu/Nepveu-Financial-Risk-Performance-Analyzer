document.getElementById("analysisForm").addEventListener("submit", async function(event) { 
    event.preventDefault();

    const ticker = document.getElementById("ticker").value.toUpperCase();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    try {
        // Fetch stock & market data from your Vercel backend
        const response = await fetch(
            `https://nepveufinancialrisk-1m8b7g0y8-wnepveus-projects.vercel.app/api/data?ticker=${ticker}`
        );
        const data = await response.json();

        let stockPrices = data.stock.historical;
        let marketPrices = data.market.historical;

        // Filter by date range
        stockPrices = stockPrices.filter(d => d.date >= startDate && d.date <= endDate);
        marketPrices = marketPrices.filter(d => d.date >= startDate && d.date <= endDate);

        // Check if empty
        if (stockPrices.length === 0 || marketPrices.length === 0) {
            alert("No data available for selected date range.");
            return;
        }

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
