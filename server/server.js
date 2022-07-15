'use strict';

var fs = require('fs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client'));
app.use(express.static('node_modules'));

app.get('/api/:fixture/:property?', function (req, res) {
  var fixture = require('./fixtures/' + req.params.fixture);
  if (req.params.property) {
    res.send(fixture[req.params.property]);
    return;
  }
  console.log(fixture);
  res.send(fixture);
});

app.post('/api/save-stock', function (req, res) {
 
  try {
    var stocks;
    fs.readFile('./fixtures/purchaseStocks.json', (err,data) => {
      if(err) throw err;
      stocks = JSON.parse(data);
      req.body.forEach(function(s, index) {
        var stock = stocks.filter((e)=>e.symbol === s.symbol);
        var total = s.quantity + stock[0].quantity;
        stocks.forEach(function(t, o){
          if (t.symbol === s.symbol){
            t.quantity = total;
          }
        });
    });
      var saveStocks = JSON.stringify(stocks, null, 2);
      fs.writeFile('./fixtures/purchaseStocks.json', saveStocks, (err) => {
        if (err) throw err;
        console.log('Stocks actualizados');
    });
    });
    res.status(200).json({mensaje:'Success'});
  } catch (error) {
      res.status(400).json({ message : error.message });
      
  }
  
});

app.listen(4000, function () {
  console.log('Server now listening on port 4000!');
});
