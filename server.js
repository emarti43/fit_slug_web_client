const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var fs = require('fs');

app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
