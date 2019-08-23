var express = require('express');
var app = express();

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true});

// const Product = mongoose.model('Product');


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/produtos', function (req, res) {
  let produtos = [];
  produtos.push({
    'id': 1,
    'nome': 'Produto 01'
  });
  res.json(produtos);
});

app.get('/', function (req, res) {
  res.send('Obtendo produto!');
});

app.get('/produto/:id', function (req, res) {
  res.send('Obtendo produto por id! ' + req.params.id);
});


app.post('/produto', function(req, res){
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