function myFunction() {

  var book = SpreadsheetApp.getActiveSpreadsheet(); // スプレッドシート（MS Excelで言う所のブック）を取得
  var sheetAtesaki = book.getSheetByName("list"); // 注意！メール配信用シートを取得
  var dataRange = sheetAtesaki.getRange("A:A").getValues(); // データが入力されている範囲を取得
  var numRows = dataRange.filter(String).length; // 処理対象の行数を取得
  Logger.log(numRows);

  for (var i = 2; i <= numRows; i++){
  var atesaki = sheetAtesaki.getRange(i, 1).getValue();
  var payload = {
    "token" : "xoxp-5222384035-5222384043-456342327043-bff6e0ac2dc51fa281e425ae3896da01",
    "channel" : "", // channelはユーザー名を入れるので空にしておく
    "text": "通知したいメッセージ"
  }
  var options = {
    "method" : "POST",
    "payload" : payload
  }
    payload.channel = atesaki; // ここで宛先を作る
    var response = UrlFetchApp.fetch("https://slack.com/api/chat.postMessage", options); // メッセージの送信なので今回はchat.postMessageを利用した
    Logger.log(atesaki); // 誰に送ったか、送信に成功したか、わかるようにユーザー名と実行結果をログに出す
    Logger.log(response);
   }
  
}