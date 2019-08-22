var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Obtendo produto!');
});


app.post('/', function(req, res){
  res.send('Adicionando produto');
});

app.put('/produto', function (req, res) {
  res.send('Atualizando produto');
});

app.delete('/produto', function (req, res) {
  res.send('Deletando um produto');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});