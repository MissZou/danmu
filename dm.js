
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs')
var count = {}
var _html = '<a style="background:rgba(30,162,255,0.8);width:12%;">舞蹈串烧 (<i>0</i>)</a><a style="background:rgba(30,162,255,0.7);width:12%;">手影舞蹈 (<i>0</i>)</a><a style="background:rgba(30,162,255,0.6);width:12%;">小品：选妃记 (<i>0</i>)</a><a style="background:rgba(30,162,255,0.5);width:12%;">手电筒光影舞 (<i>0</i>)</a><a style="background:rgba(30,162,255,0.6);width:12%;">小品：进鸡的少年 (<i>0</i>)</a><a style="background:rgba(30,162,255,0.7);width:12%;">爵士屁股舞 (<i>0</i>)</a><a style="background:rgba(30,162,255,0.8);width:12%;">PPAP合唱 (<i>0</i>)</a>'
var __html = ''
var __html1 = '<a style="background:rgba(30,162,255,0.8)">舞蹈串烧</a><a style="background:rgba(30,162,255,0.7)">手影舞蹈</a><a style="background:rgba(30,162,255,0.6)">小品：选妃记</a><a style="background:rgba(30,162,255,0.5)">手电筒光影舞</a><a style="background:rgba(30,162,255,0.6)">小品：进鸡的少年</a><a style="background:rgba(30,162,255,0.7)">爵士屁股舞</a><a style="background:rgba(30,162,255,0.8)">PPAP合唱</a>'
var __html2 = '<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">蒋凡</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">闻仲</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">恶魔</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">季山</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">风铃</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">无情</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">齐俊生</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">紫玲</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">寇仲</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">千城</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">钧源</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">川普</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">君逾</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">何信</a>'+
'<a style="background:rgba(30,162,255,0.8);width:25%;display:inline-block">承渊</a>'

var _html2 = '<a style="background:rgba(30,162,255,0.8);width:12%;">蒋凡(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">闻仲(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">恶魔(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">季山(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">风铃(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">无情(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">齐俊生(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">紫玲(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">寇仲(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">千城(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">钧源(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">川普(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">君逾(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">何信(<i>0</i>)</a>'+
'<a style="background:rgba(30,162,255,0.8);width:12%;">承渊(<i>0</i>)</a>'


setInterval(function(){
    fs.writeFile('_count.html',JSON.stringify(count))
},3000)
var open = !1

app.get('/', function(req, res){
  res.sendfile('t.html');
});


app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/open', function(req, res){
    if(open === 1){
        res.send(__html1);
    }else if (open === 2){
        res.send(__html2);
    }else{
        res.send('false')
    }
});
app.get('/push', function(req, res){
  console.log(req.query.d)
  var msg = req.query.d
  if(msg === "FUN开一起来，开启投票吧"){
        __html = __html2
        open = 2
        count = {}
        io.emit("open",{
            open:open,
            html:_html2
        })
        
    }else if(msg === "我爱淘宝，开启投票吧"){
        open = 1
        __html = __html1
        io.emit("open",{
            open:open,
            html:__html1
        })
        
    }
    io.emit('chat message', {
        msg:msg,
        c:Math.random()*6|0
    });
  res.send('');
});
app.get('/up', function(req, res){
  console.log(req.query)
  var index = req.query.u
  if(!count[""+index]){
    count[""+index] = 0
  }
  count[""+index] += 1
  io.emit('up', {
        index:index,
        count:count[""+index]
    });
  res.send('');
});
app.get('/push.html', function(req, res){
  console.log(req.query.d)
  res.sendfile('push.html');
})

io.on('connection', function (socket) {
  io.emit('news2', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  console.log('a user connected');

  
  io.emit("open",{
      open:open,
      html:open === 2 ? _html2 : _html
  })
  if(open){
      Object.keys(count).forEach(function(index){
        console.log(count)
            io.emit('up', {
                index:+index,
                count:count[index]
            });
    })
  }
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('push', function(msg){
      console.log("pushsssssss")
    if(msg === "FUN开一起来，开启投票吧"){
        open = 2
        count = {}
        __html = __html2
        io.emit("open",{
            open:open,
            html:_html2
        })
        
    }else if(msg === "我爱淘宝，开启投票吧"){
        open = 1
        count = {}
        __html = __html1
        io.emit("open",{
            open:open,
            html:_html
        })
        
    }
    io.emit('chat message', {
        msg:msg,
        c:Math.random()*6|0
    });
  });

  
  socket.on('toupiao',function(index){
      console.log('toupiao',count[""+index],index,count)

      if(!count[""+index]){
          count[""+index] = 0
      }
      count[""+index] += 1
      io.emit('up', {
        index:index,
        count:count[""+index]
    });
  })
});
http.maxConnections = 600
http.listen(17108, function(){
  console.log('listening on *:17108');
});