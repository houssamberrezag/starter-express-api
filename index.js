import express, { json } from 'express';
import scraper from '@bochilteam/scraper';
import {
    savefrom
  } from '@bochilteam/scraper';

const app = express();

app.use(json())

const PORT = process.env.PORT || 3000;

app.get('/abc', async (req, res) => {
const url = req.query.url;
console.log(url);
  savefrom(url).then(
    data=>{
         res.json( transform(data) )
    }
  ).catch(err=>{
    res.json("not found")
  });
   
});

app.listen(PORT, () => console.log(`App listening at ppport ${PORT}`));

function transform(data){
    return {
        img:data.thumb,
        urls:data.url.map(u=>({
            url:u.url,
            quality:u.quality,
            ext:u.ext,
            size:u.filesize
        }))
    }
}
