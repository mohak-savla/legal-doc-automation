const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World from the Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
