const express = require('express');
const routes=require('./routes/route')
const client=require('./util/db')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

client
.connect()
.then(()=>{console.log('postgres connected..')})
.catch((err)=>console.log(err))

app.use('/', routes);

app.listen(3000, () => {
  console.log(`server is running at:3000..`);
});