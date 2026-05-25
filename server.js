const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const root = __dirname;

app.use(express.static(root));

app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'index.html'));
});

app.listen(port, () => {
  console.log(`Demokrogen listening on port ${port}`);
});
