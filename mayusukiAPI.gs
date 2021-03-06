function doGet(e){
  if(!e.parameter.until || !e.parameter.since) {
    return createJsonContent(e.parameter.callback, {"error" :"required parameter is missing"});
  }
  sheet = getMayusukiSheet();
  var until = new Date(e.parameter.until);
  var since = new Date(e.parameter.since);
  var data =  sheet.getDataRange().getValues();
  data.shift(); // カラム名を除外
  var columns = ["id", "date", "count"];
  data = arraToObject(data, columns);
  data = data.filter(function(m){
    return (m["date"] <= until && m["date"] >= since);
  });
  var jsonData = {"data":data}  
  var content = createJsonContent(e.parameter.callback, jsonData);
  return content;
}

function createJsonContent(callback, jsonData){
  var text = JSON.stringify(jsonData, null, 4);
  if (callback){
    return ContentService.createTextOutput(callback + "(" + text + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }else{
    return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
  }
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