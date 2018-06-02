function sendPushNotification() {

// スプレッドシート（MS Excelで言う所のブック）を取得
var book = SpreadsheetApp.getActiveSpreadsheet();

// 注意！メール配信用シートを取得
var sheetAtesaki = book.getSheetByName("list");

// データが入力されている範囲を取得
var dataRange = sheetAtesaki.getDataRange();

// 処理対象の行数を取得
var numRows = dataRange.getNumRows();

// for文-----

for (var i = 2; i <= numRows; i++){

var atesaki = sheetAtesaki.getRange(i, 1).getValue();

// POSTデータ
var payload = {
"id" : "SimgXZFYKMy7d", // Accrete ID
"pass" : "wRW8kaui", // Accrete PASS
"text" : "武者修行プログラム説明会は明日開催。体験談が直接聞けます!お楽しみにPV:goo.gl/JbymVz武者修行事務局03-6803-0927", // 送付したい文章（70字）
"telno" : atesaki, // 送付先電話番号
}

// POSTオプション
var options = {
"method" : "POST",
"payload" : payload
}

// アクセス先
var url = "https://api.acrt.jp/ibss/api/sms_reg/jF865247/" 

// POSTリクエスト
var response = UrlFetchApp.fetch(url, options);

// HTML結果を取得（引数のcharsetは設定したほうが良い）
var content = response.getContentText("UTF-8");

}
}