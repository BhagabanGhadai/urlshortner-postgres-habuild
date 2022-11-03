const client=require('../util/db')
const {shortId} = require('../util/shortId');

const webhost = 'http://localhost:3000';

const shorten=async (req, res) =>{
  try{
    if (req.body.longurl) {
      const shortUrl = await client.query('SELECT * FROM url WHERE longurl=$1;',[req.body.longurl]);
        if (shortUrl.rows.length!=1) {
          let shortCode=shortId()
          let shortUrl=webhost+'/'+shortCode
          let saveInDb = await client.query(`INSERT INTO url (longurl,shorturl,shortid) 
          VALUES ($1,$2,$3);`, [req.body.longurl,shortUrl,shortCode]);
          res.status(201).json({ shortUrl: `${webhost}/${shortCode}` });
        }else{
          res.status(200).json({ shortUrl:shortUrl.rows[0].shorturl });
        }
    }else{
      return res.status(400).send({ status: false, message: "Please provide longurl" }); 
    }
  }catch(err){
    res.status(500).send({error: err });
  }
}

const decodeToOriginal=async (req, res)=>{
  try{
    const shortID = req.params.shortId;
    console.log(shortID)
    const longUrl = await client.query('SELECT * FROM url WHERE shortid=$1;',[shortID]);
    return res.status(302).redirect(longUrl.rows[0].longurl);
  }catch(err){
    res.status(500).send({error: err }); 
  }
}


const updateUrl=async (req, res)=>{
  try{
    const {longurl,shorturl} = req.body
    const urlData= await client.query('SELECT * FROM url WHERE shorturl=$1;',[shorturl]);
    if(urlData.rows.length==1){
      const updateUrl = await client.query('UPDATE url SET longurl= $1 WHERE shorturl = $2',
      [longurl,shorturl]);
      res.status(200).send({data:'user updated successful'});
    }
  }catch(err){
    res.status(500).send({error: err }); 
  }
}
module.exports = {shorten,decodeToOriginal,updateUrl};