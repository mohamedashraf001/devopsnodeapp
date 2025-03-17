import express  from "express";

import os from "os";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send(`Hello from 1235${os.hostname()}!`);
    });

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
    });    

