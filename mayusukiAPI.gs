function doGet(e){
  sheet = getMayusukiSheet();
//  var until = new Date(e.until);
//  var since = new Date(e.until);
  var until = new Date(111111111111111111111);
  var since = new Date("2017/11/12");
  Logger.log(until)
//  var data =  sheet.getDataRange().getValues();
//  data.shift(); 
//  var columns = ["id", "date", "count"];
//  data = arraToObject(data, columns);  
//  var jsonData = {"data":data}
//  var content = createJsonContent(jsonData);
//  return content;
}

function createJsonContent(jsonData){
  var text = JSON.stringify(jsonData);
  var content = ContentService.createTextOutput(text);
  return content.setMimeType(ContentService.MimeType.JSON);
}

//2次元配列をオブジェクト配列に変換する
function arraToObject(data, columns){
  return data.map(function(ar){
    var row = {};
    for(var i = 0; i<columns.length; i++) row[columns[i]] = ar[i];
    return row;
  })
}

//JSON.stringify時にJSTの時刻が返ってくるようにする
Date.prototype.toJSON = function() {
    return this.getFullYear() + '-' + ('0'+(this.getMonth()+1)).slice(-2) + '-' + ('0'+this.getDate()).slice(-2) + 'T' +
     ('0'+this.getHours()).slice(-2) + ':' + ('0'+this.getMinutes()).slice(-2) + ':' + ('0'+this.getSeconds()).slice(-2) + '.000Z';
}