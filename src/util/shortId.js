
function shortId(){
  let uniqueID = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
  return uniqueID
}

module.exports={shortId}