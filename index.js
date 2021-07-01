const express = require("express");
const libgen = require('libgen');
var cors = require('cors')
// const app = express();
const app=express().use('*', cors());

app.get("/getBook", (req, res) => {

  let options = {
    mirror: 'http://gen.lib.rus.ec',
    query:  `${req.query.isbnNumber}`,
    count: 15,
    sort_by: 'year',
    search_in: 'identifier',
    reverse: true
  }

  const getData = async() => {
    try {
      let data = await libgen.search(options)
      let n = data.length

      if(data.length === undefined) {
        console.log("No result found")
        options = {
          mirror: 'http://gen.lib.rus.ec',
          query:  `${req.query.title}`,
          count: 15,
          sort_by: 'year',
          search_in: 'def',
          reverse: true
        }

        data = await libgen.search(options)

        if(data.length === undefined) {
          res.send('not found')
        }

        n = data.length
        console.log(`${n} results for "${options.query}"`)

      }
      console.log(`${n} results for "${options.query}"`)

      res.json(data)

    } catch (err) {
      console.error(err)
    }
  }
  
  getData()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, console.log(`Server started on port ${PORT}`))