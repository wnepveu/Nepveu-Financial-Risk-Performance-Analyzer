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

        // Fetch S&P 500 data
        const marketResponse = await fetch(
            `https://financialmodelingprep.com/api/v3/historical-price-full/%5EGSPC?apikey=${apiKey}`
        );
        const marketData = await marketResponse.json();

        console.log("Stock Data:", stockData);
        console.log("Market Data (S&P 500):", marketData);

        alert("Data successfully fetched! Check console.");

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data.");
    }
});
