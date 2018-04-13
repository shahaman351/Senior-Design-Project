var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, xml2js = require('xml2js')
, parser = new xml2js.Parser()
, fs = require('fs')

app.listen(8000);

function handler(req, res)
{
  fs.readFile('alerts.html',
  function (err, data)
  {
    if(err)
    {
    console.log(err);
    res.writeHead(500);
    return res.end("Error loading alerts.html");

  }
  res.writeHead(200);
  res.end(data);

});


fs.readFile('map.html',
function (err, data)
{
  if(err)
  {
  console.log(err);
  res.writeHead(500);
  return res.end("Error loading alerts.html");

}
res.writeHead(200);
res.end(data);

});


fs.readFile('signin.html',
function (err, data)
{
  if(err)
  {
  console.log(err);
  res.writeHead(500);
  return res.end("Error loading alerts.html");

}
res.writeHead(200);
res.end(data);

});


fs.readFile('news.html',
function (err, data)
{
  if(err)
  {
  console.log(err);
  res.writeHead(500);
  return res.end("Error loading alerts.html");

}
res.writeHead(200);
res.end(data);

});

};

io.sockets.on('connection', function(socket)
{
  fs.watchFile('example.xml', function(curr, prev)
{
  fs.readFile('example.xml', function(err, data)
{
  if(err) throw err;
  parser.parserString(data);

});
});
parser.addListener('end', function(result)
{
  socket.volatile.emit('notifications', result);
});
});
