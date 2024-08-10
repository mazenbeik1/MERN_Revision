const val = require('validator')
const http = require('http')
const url = require('url')
const fs = require('fs').promises

const server = http.createServer(async (req,res)=>{
    const myUrl = new URL(req.url, `http://localhost:3000/`);
    const pathname = myUrl.pathname;
    console.log(pathname)

    if(pathname === '/'){
        const html = await fs.readFile('./view/index.html', 'utf-8')
        res.writeHead(200,{"Content-Type": 'text/html'})
        res.end(html)
    }else if( pathname.includes(".css")){
        const cssFile = await fs.readFile('./public/css/index.css')
        res.writeHead(200,{"Content-Type": 'text/css'})
        res.end(cssFile)
    }
})

server.listen(3000)