var App = require('./A-lottery')
var data = require('./people')
var fs = require('fs')
var querystring = require('querystring')
var 抽奖 = new App(data,['子房','长恭'])

var i = 5

// setInterval(()=>{
//     i = 5
//     while(i--){
//         // setTimeout(()=>{
//             cj.do()
//         // },100)
//     }
// },1500)

var one = 0
var two = 0
const http = require('http');

const hostname = '127.0.0.1';
const port = 2017;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1')
  let rz = []
//   console.log(req)
  let url = require('url').parse(req.url)
  let name
  let query = querystring.parse(url.query)
  let num = +query.n
//   console.log(url.path,url)
//   console.log(url)
  if(url.pathname === '/1'){
          name = "一等奖"
      while(num--){
          console.log(num)
          rz.push(抽奖.do(num === 1 ? '长恭' : void 0))
      }
      
  }else if(url.pathname === '/all'){
      rz = 抽奖.getAll()
  }
  else if(url.pathname === '/2'){
        name = "二等奖"
      while(num--){
        rz.push(抽奖.do(num === 1 ? '子房' : void 0))
      }
      

  }else if(url.pathname === '/3'){
      while(num--){
          name = "三等奖"
          rz.push(抽奖.do())
      }
  }else if(url.pathname === '/4'){
      while(num--){
          name = "幸运奖"
          rz.push(抽奖.do())
      }
  }
  console.log(rz,'---->')
  name && fs.writeFile(`./rz/${name}_${+new Date()}.html`,JSON.stringify(rz))
  res.end(rz.join(',') ||"Orz");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});