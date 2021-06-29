const app = require('./config/express')();
const port = app.get('port')
require('dotenv/config')


app.listen(port, () => {
    console.log(`Server port ${port}`);
});