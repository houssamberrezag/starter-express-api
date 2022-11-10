const express = require('express')
const savefrom = require ('@bochilteam/scraper');
const app = express()
app.all('/abc', (req, res) => {
    const url = req.query.url;
console.log(url);
  savefrom(url).then(
    data=>{
         res.json( transform(data) )
    }
  ).catch(err=>{
    res.json("not found")
  });
})
app.listen(process.env.PORT || 3000)

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
