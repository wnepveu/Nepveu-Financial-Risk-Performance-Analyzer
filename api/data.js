export default async function handler(req, res) {
    const { ticker } = req.query;

    const apiKey = "o96BmVE3B2u1You8VJZgaMWwS5UD9NVR";

    try {
        const stockResponse = await fetch(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${apiKey}`
        );

        const marketResponse = await fetch(
            `https://financialmodelingprep.com/api/v3/historical-price-full/%5EGSPC?apikey=${apiKey}`
        );

        const stockData = await stockResponse.json();
        const marketData = await marketResponse.json();

        res.status(200).json({
            stock: stockData,
            market: marketData
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
