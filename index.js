const express = require("express");
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');


const PORT = 3000;

const app = express();


var urlData = new Map()

app.use(express.json()) 
app.use(morgan('tiny'));

app.post("/shorten" , (req, res) =>{
  let body = req.body
  let url = body.url
  // TODO shorter Ids
  let responsData = {
    OriginalUrl :url,
    urlId: uuidv4()
  }
  console.log("Adding URL to memory")
  urlData.set(responsData.urlId,responsData.OriginalUrl)
  res.status(200).json(responsData).end()
})

app.get("/shortUrl/:id", (req, res) => {
  if (urlData.get(req.params.id)){
    res.writeHead(301,
      {Location: urlData.get(req.params.id)}
    ).end();

  }else
    {
      res.status(404).json({ "message": "The requested URL doesn't exist"})
    }
})


app.listen(PORT, () =>
  console.log(`Server is listen on port ${PORT}`)
);

