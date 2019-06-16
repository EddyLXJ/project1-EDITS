var connection = require('../config/config');
var Product = function() {};

// search product by asin
Product.prototype.findByAsin = function(asin, callback) {
  var sql = "SELECT * FROM `tb_product` WHERE asin = '" + asin +"';";

  // make the query
  connection.query(sql, function(err,row, results) {
      if (err) {
          callback(err);
          return;
      }
      callback(false, row[0]);
  });
}

// add product
Product.prototype.addProduct = function(asin, productName, productDescription, group, callback) {
  var sql = "INSERT INTO `tb_product` ( `asin`, `productName`, `productDescription`, `group`) VALUES ('"+ asin + "', '"+ productName +"', '" + productDescription +"', '"+ group +"');";
  // make the query
  console.log(sql);
  connection.query(sql, function(err,row, results) {
      if (err) {
          callback(err);
          console.log(err);
          return;
      }
      console.log("4444");
      callback(false, row[0]);
  });
}

// update product
Product.prototype.updateProduct = function(asin, productName, productDescription, group, callback) {
  var sql = "UPDATE `tb_product` SET `productName` = '" + productName + "', `productDescription` = '" + productDescription +"', `group` = '" + group + "' WHERE `asin` = '" + asin + "';"
  // make the query
  connection.query(sql, function(err,row, results) {
      if (err) {
          callback(err);
          console.log(err);
          return;
      }
      callback(false, row[0]);
  });
}

// view product
Product.prototype.viewProduct = function(parameter, callback){
  var temSql = "";
  for(var key in parameter){
    if(key == "keyword"){
      temSql += "(`productName` like '%" + parameter[key] +"%' or `productDescription` like '%" + parameter[key] +"%') and ";
    } else {
      temSql += "`" + key +"` = '"+ parameter[key] + "' and ";
    }
  }

  if(temSql.length != 0){
    temSql = temSql.slice(0, -4);
    var sql = "SELECT `asin`, `productName` FROM `tb_product` WHERE " + temSql;
  } else {
    var sql = "SELECT `asin`, `productName` FROM `tb_product`";
  }
  console.log(sql);
  connection.query(sql, function(err,row, results) {
      if (err) {
          callback(true);
          return;
      }
      callback(false, row);
  });
}

module.exports = Product;
