const express = require("express");
const path = require("path");

const app = express();

// ✅ Serve static files
app.use(express.static(path.join(__dirname)));

// ✅ Parse JSON
app.use(express.json());

// ✅ Health check endpoint (VERY IMPORTANT for Kubernetes)
app.get("/", (req, res) => {
    res.send("App is running 🚀");
});

// ✅ Canary simulation API (safe version)
app.post("/set-traffic", (req, res) => {
    const percent = parseInt(req.body.percent);

    let replicas = 1;

    if (percent >= 50) replicas = 2;
    if (percent >= 80) replicas = 3;

    console.log("Requested traffic:", percent);
    console.log("Simulated scaling to:", replicas);

    // 🔥 IMPORTANT:
    // We are NOT running kubectl inside container
    // This is just simulation for now

    res.json({
        message: "Traffic updated (simulated)",
        replicas: replicas
    });
});

// ✅ Start server (CRITICAL FIX)
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
