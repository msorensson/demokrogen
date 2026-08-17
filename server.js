const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const root = __dirname;

const CHAT_EMBED_SRC = process.env.CHAT_EMBED_SRC || 'http://localhost:3017/embed.js';
const CHAT_RESTAURANT = process.env.CHAT_RESTAURANT || 'natur';
const CHAT_AUTO_OPEN = String(process.env.CHAT_AUTO_OPEN || '').toLowerCase() === 'true';

const indexPath = path.join(root, 'index.html');

function renderIndex () {
  let html = fs.readFileSync(indexPath, 'utf8');
  html = html.replace(/__CHAT_EMBED_SRC__/g, escapeHtmlAttr(CHAT_EMBED_SRC));
  html = html.replace(/__CHAT_RESTAURANT__/g, escapeHtmlAttr(CHAT_RESTAURANT));
  html = html.replace(
    /__CHAT_AUTO_OPEN_ATTR__/g,
    CHAT_AUTO_OPEN ? ' data-auto-open="true"' : ''
  );
  return html;
}

function escapeHtmlAttr (value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

app.use(express.static(root, {
  index: false
}));

app.get(['/', '/index.html'], (req, res) => {
  res.type('html').send(renderIndex());
});

app.get('*', (req, res) => {
  res.type('html').send(renderIndex());
});

app.listen(port, () => {
  console.log(`Demokrogen listening on port ${port}`);
  console.log(`Chat embed: ${CHAT_EMBED_SRC} (restaurant=${CHAT_RESTAURANT}, autoOpen=${CHAT_AUTO_OPEN})`);
});
