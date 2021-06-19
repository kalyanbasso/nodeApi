const app = require('./config/express')();
const port = app.get('port')
require('dotenv/config')
const cors = require('cors')

app.listen(port, () => {
    console.log(`Server port ${port}`);
});