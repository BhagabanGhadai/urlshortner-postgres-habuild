const {Client}=require('pg')

const client=new Client({
    user:'postgres',
    host:'localhost',
    database:'habuild',
    password:'Bhagaban@043',
    port:5432
})

module.exports=client