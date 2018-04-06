/**
* メール一括送信処理の定義
*/
function sendMail() {
//————- （１）注意！メール配信用シートから処理対象の行数を取得 ———————–
// スプレッドシート（MS Excelで言う所のブック）を取得
var book = SpreadsheetApp.getActiveSpreadsheet();
// 注意！メール配信用シートシートを取得
var sheetAtesakiList = book.getSheetByName("注意！メール配信用シート");
// データが入力されている範囲を取得
var datRange = sheetAtesakiList.getDataRange();
// 処理対象の行数を取得
var numRows = datRange.getNumRows();
//————- （２）メール本文の情報を取得 ———————–
// メール本文シートを取得
var sheetMailHonbun = book.getSheetByName("メール本文");
// メール件名を取得
var subject = sheetMailHonbun.getRange(2, 3).getValue();
// メール本文を取得
var body = sheetMailHonbun.getRange(4, 3).getValue();
// 処理を開始する行番号を取得
var start = sheetAtesakiList.getRange(1, 5).getValue();
//————- （３）メール送信処理 ———————–
  for (var i = start;i <= numRows;i++) 
  { // 対象行の差込データを取得 
var sasikomiData1 = sheetAtesakiList.getRange(i, 6).getValue(); var sasikomiData2 = sheetAtesakiList.getRange(i, 7).getValue(); var sasikomiData3 = sheetAtesakiList.getRange(i, 8).getValue(); var sasikomiGoSubject = subject; var sasikomiGoBody = body; 
    // 差込データ1が入力されている場合は、差込処理を行う（件名＋本文） 
    if (sasikomiData1 != "") { sasikomiGoSubject = sasikomiGoSubject.replace("{{差込データ1}}", sasikomiData1, "g"); sasikomiGoBody = sasikomiGoBody.replace("{{差込データ1}}", sasikomiData1, "g"); } 
    // 差込データ2が入力されている場合は、差込処理を行う 
    if (sasikomiData2 != "") { sasikomiGoSubject = sasikomiGoSubject.replace("{{差込データ2}}", sasikomiData2, "g"); sasikomiGoBody = sasikomiGoBody.replace("{{差込データ2}}", sasikomiData2, "g"); } 
    // 差込データ3が入力されている場合は、差込処理を行う 
    if (sasikomiData3 != "") { sasikomiGoSubject = sasikomiGoSubject.replace("{{差込データ3}}", sasikomiData3, "g"); sasikomiGoBody = sasikomiGoBody.replace("{{差込データ3}}", sasikomiData3, "g"); } 
    // 対象行の宛先を取得 
    var to = sheetAtesakiList.getRange(i, 2).getValue(); var cc = sheetAtesakiList.getRange(i, 3).getValue(); var bcc = sheetAtesakiList.getRange(i, 4).getValue(); MailApp.sendEmail(to, sasikomiGoSubject, sasikomiGoBody, {cc:cc, bcc:bcc}); 
    // 処理を開始する行番号を設定（次回実行時には次の行から開始するようにする） 
    sheetAtesakiList.getRange(1, 5).setValue(i + 1); 
    // 配信状態を設定 
    sheetAtesakiList.getRange(i, 5).setValue("配信済"); } 
    // 終了確認ダイアログを表示 
    Browser.msgBox("確認", "メール一斉送信が完了しました。", Browser.Buttons.OK); 
    // 処理を開始する行番号を初期化 
    sheetAtesakiList.getRange(1, 5).setValue(3); }; 
    /** * スプレッドシート（MS Excelで言う所のブック）を開いた時に実行する処理。 * スプレッドシートを開いた際に、以下の処理（関数）が自動実行される。 * ここではコントロールメニューにスクリプト実行コマンドを追加している。 */ 
    function onOpen() { var sheet = SpreadsheetApp.getActiveSpreadsheet(); var entries = [ { name : "メール一斉送信", functionName : "sendMail" } ]; sheet.addMenu("スクリプト実行", entries); };