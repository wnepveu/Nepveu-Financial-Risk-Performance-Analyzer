export default async function handler(req, res) {
    const { ticker } = req.query;
    const apiKey = process.env.FMP_API_KEY || "o96BmVE3B2u1You8VJZgaMWwS5UD9NVR";

    try {
        // Fetch stock historical data using the new stable endpoint
        const stockResponse = await fetch(
            `https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=${ticker}&apikey=${apiKey}`
        );

        // Fetch S&P 500 historical data using the new stable endpoint
        const marketResponse = await fetch(
            `https://financialmodelingprep.com/stable/historical-price-eod/light?symbol=^GSPC&apikey=${apiKey}`
        );

        const stockData = await stockResponse.json();
        const marketData = await marketResponse.json();

        res.status(200).json({ stock: stockData, market: marketData });

    } catch (error) {
        console.error("Error fetching from FMP:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
