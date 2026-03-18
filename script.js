document.getElementById("analysisForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Placeholder behavior (no calculations yet)
    document.getElementById("hpr").textContent = "Calculating...";
    document.getElementById("annualReturn").textContent = "Calculating...";
    document.getElementById("volatility").textContent = "Calculating...";
    document.getElementById("beta").textContent = "Calculating...";
    document.getElementById("alpha").textContent = "Calculating...";
    document.getElementById("sharpe").textContent = "Calculating...";
});
