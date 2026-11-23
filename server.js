import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONresponse } from './utils/sendJSONresponse.js'
import { getDataByPath } from './utils/getDataByPath.js'
import { getDatabyQuery } from './utils/getDatabyQuery.js'
const PORT = 8000

const server = http.createServer(async (req, res) => {
  let destinations = await getDataFromDB()
const urlObj = new URL(req.url,`http://${req.headers.host}`)
const queryObj = Object.fromEntries(urlObj.searchParams)
console.log(queryObj)


  if (urlObj.pathname === '/api' && req.method === 'GET') {
    const filteredData = getDatabyQuery(destinations,queryObj)
    sendJSONresponse(res,200,filteredData)

  }
  else if(req.url.startsWith('/api/continent') && req.method === 'GET')
    {
const continent = req.url.split('/').pop()

const filteredData = getDataByPath(destinations,'continent',continent)

sendJSONresponse(res,200,filteredData)

  }else if(req.url.startsWith('/api/country') && req.method === 'GET'){
    const country = req.url.split('/').pop()

    const selected = getDataByPath(destinations,'country',country)

    sendJSONresponse(res,200,selected)

  } else{
   sendJSONresponse(res,404,{error: "not found", message: "The requested route does not exist"})
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
