const express = require('express');
const path = require('path');

const app = express();

const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(distDir, './index.html'))
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running');
});