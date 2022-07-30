import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as fs from "fs";

dotenv.config();

const PORT = process.env.APP_PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static('statics'));

app.get('/carousel', (req, res) => {
    if (req.query.index === undefined || req.query.index.length === 0) {
        return res.json({
            error: true,
            message: 'The required parameter "index" is missing'
        });
    }

    let path = `statics/carousel/${req.query.index}`;
    let file_url =  `${req.protocol}://${req.get('host')}/carousel/${req.query.index}/`;
    const files_links = [];

    try {
        const dir = fs.readdirSync(path);
        dir.map(item => {
            files_links.push(`${file_url}${item}`)
        });

    } catch (e) {
        return res.json({
            error: true,
            message: `The directory with index ${req.query.index} does not exist`
        })
    }

    return res.json(files_links)
});

app.listen(PORT, () => console.log(`The server is running and is available at: http://localhost:${PORT}`));