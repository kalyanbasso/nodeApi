const cors = require('cors')
const app = require('./config/express')();
const port = app.get('port')
require('dotenv/config')


app.use((req, res, next) => {
    app.use(cors())
    next();
})

app.listen(port, () => {
    console.log(`Server port ${port}`);
});