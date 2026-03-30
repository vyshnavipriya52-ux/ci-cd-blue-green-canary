const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();

// ✅ Serve static files (VERY IMPORTANT)
app.use(express.static(path.join(__dirname)));

app.use(express.json());

// Canary API
app.post("/set-traffic", (req, res) => {
    const percent = parseInt(req.body.percent);

    let replicas = 1;

    if (percent >= 50) replicas = 2;
    if (percent >= 80) replicas = 3;

    console.log("Scaling to:", replicas);

    exec(`kubectl scale deployment my-app-canary --replicas=${replicas}`, (err) => {
        if (err) {
            console.log(err);
            return res.send("Error scaling");
        }
        res.send(`Scaled to ${replicas}`);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
