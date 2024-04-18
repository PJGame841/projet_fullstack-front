const express = require('express');

const app = express();

const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running');
});