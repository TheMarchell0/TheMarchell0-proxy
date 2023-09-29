const express = require('express');
const cors = require('cors');
const {default: axios} = require('axios');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'https://smarttravel-opros.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/proxy', async (req, res) => {
    let googleScriptUrl;
    if(req.body.question && (req.headers.origin === 'http://localhost:3000')){
        googleScriptUrl = "https://script.google.com/macros/s/AKfycbwDGDGJch0McpuMMotfZpN_gLqTo66etvf2a0TihsPoLJoOUpo87fS6CxqDhwQgis0d2A/exec";
    }
    else if(req.headers.origin === 'http://localhost:3000'){
        googleScriptUrl = "https://script.google.com/macros/s/AKfycbxlBOHZhI7jLT-MHKgihYTVjQioiey89IkCEtQAZMmXL0qz_ZVOtPehhHfjeI2Tn1o0/exec";
    }
    else{
        googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyEml6rBMVdGc0g33nqaXea-UDabkhvjvhfClK87mFW7g6KbuiOWMInulRf1ikwuddJaw/exec';
    }
    try {
        const response = await axios.post(googleScriptUrl, req.body);
        res.send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error with POST request: ' + error.message);
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Proxy server listening on port ${port}`));
