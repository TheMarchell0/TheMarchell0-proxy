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
    try {
        let googleScriptUrl;
        if(req.body.type === "Заявка"){
            googleScriptUrl = "https://script.google.com/macros/s/AKfycbyoPqNg5XfUPhO0z3tNMw7YmSfBSMF-rm-i6or2pROfjTpoEoMtOwgp6qXDj2j9prFiWg/exec";
        }
        else if(req.body.type === "Заявка на консультацию"){
            googleScriptUrl = "https://script.google.com/macros/s/AKfycbyE7f1e6d7YBtXk_udscg48N09q15ZQ49_bHSsaHxqE2KJ7zTiOvEVRdzrM7yc7Vjx28A/exec";
        }
        else{
            googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyEml6rBMVdGc0g33nqaXea-UDabkhvjvhfClK87mFW7g6KbuiOWMInulRf1ikwuddJaw/exec';
        }

        const response = await axios.post(googleScriptUrl, req.body);
        res.send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error with POST request: ' + error.message);
    }
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Proxy server listening on port ${port}`));
