const express = require('express');
const helmet = require('helmet');

const app = express();

 
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", "https://erp.fabrixcel.com"]
            }
        }
    })
);

app.listen(3000, () => console.log('Server running on port 3000'));
