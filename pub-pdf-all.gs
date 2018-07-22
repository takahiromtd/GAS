function myFunction(){

  //参考にしたURL：https://www.virment.com/create-pdf-google-apps-script/

  // PDFの保存先となるフォルダID 確認方法は後述
  var folderid = "1Oispkz-lT9hrXaUiCCP0YPv4kb83Nv_g";
  
  // マイドライブ直下に保存したい場合は以下
  // var root= DriveApp.getRootFolder();
  // var folderid = root.getId();
  
  /////////////////////////////////////////////  
  // 現在開いているスプレッドシートをPDF化したい場合//
  ////////////////////////////////////////////
  // 現在開いているスプレッドシートを取得
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 現在開いているスプレッドシートのIDを取得
  var ssid = ss.getId();
  
  // 現在開いているスプレッドシートのシートIDを取得
  var sheetid = ss.getActiveSheet().getSheetId();
  // getActiveSheetの後の()を忘れると、TypeError: オブジェクト function getActiveSheet() {/* */} で関数 getSheetId が見つかりません。
  
  // PDF作成関数
  createPDF( folderid, ssid, sheetid );
  
}

// PDF作成関数　引数は（folderid:保存先フォルダID, ssid:PDF化するスプレッドシートID, sheetid:PDF化するシートID, filename:PDFの名前）
function createPDF(folderid, ssid, sheetid){

 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var nop = ss.getRange("D1").getValue();
 var nos = ss.getRange("A1").getValue();
  
 for(var i = nos; i <= nop; i++) {
  ss.getRange("A1").setValue(i);
  SpreadsheetApp.flush();

   Utilities.sleep(8000);
  
   // ファイル名に使用する名前を取得
  var customer_name = ss.getRange("B1").getValue();
  // ここで使用しているスプレッドシートのB1に顧客の名前が入っているため、それをファイル名用に取得しているだけです。

  var customer_term = ss.getRange("C1").getValue();
  // ここで使用しているスプレッドシートのC1にタームの名前が入っているため、それをファイル名用に取得しているだけです。

  // ファイル名に使用するタイムスタンプを取得
  var timestamp = getTimestamp(); 

  //  + "_" + timestamp でタイムスタンプ追加
  var filename= customer_term + "_" + customer_name

  // PDFファイルの保存先となるフォルダをフォルダIDで指定
  var folder = DriveApp.getFolderById(folderid);

  // スプレッドシートをPDFにエクスポートするためのURL。このURLに色々なオプションを付けてPDFを作成
  var url = "https://docs.google.com/spreadsheets/d/SSID/export?".replace("SSID", ssid);

  // PDF作成のオプションを指定
  var opts = {
    exportFormat: "pdf",    // ファイル形式の指定 pdf / csv / xls / xlsx
    format:       "pdf",    // ファイル形式の指定 pdf / csv / xls / xlsx
    size:         "A4",     // 用紙サイズの指定 legal / letter / A4
    portrait:     "true",   // true → 縦向き、false → 横向き
    fitw:         "true",   // 幅を用紙に合わせるか
    sheetnames:   "false",  // シート名をPDF上部に表示するか
    printtitle:   "false",  // スプレッドシート名をPDF上部に表示するか
    pagenumbers:  "false",  // ページ番号の有無
    gridlines:    "false",  // グリッドラインの表示有無
    fzr:          "false",  // 固定行の表示有無
    gid:          sheetid   // シートIDを指定 sheetidは引数で取得
  };
  
  var url_ext = [];
  
  // 上記のoptsのオプション名と値を「=」で繋げて配列url_extに格納
  for( optName in opts ){
    url_ext.push( optName + "=" + opts[optName] );
  }

  // url_extの各要素を「&」で繋げる
  var options = url_ext.join("&");

  // optionsは以下のように作成しても同じです。
  // var ptions = 'exportFormat=pdf&format=pdf'
  // + '&size=A4'                       
  // + '&portrait=true'                    
  // + '&sheetnames=false&printtitle=false' 
  // + '&pagenumbers=false&gridlines=false' 
  // + '&fzr=false'                         
  // + '&gid=' + sheetid;

  // API使用のためのOAuth認証
  var token = ScriptApp.getOAuthToken();

    // PDF作成
    var response = UrlFetchApp.fetch(url + options, {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });

    // 
    var blob = response.getBlob().setName(filename + '.pdf');

  //}

  //　PDFを指定したフォルダに保存
  folder.createFile(blob);

}

}

 // タイムスタンプを返す関数
 function getTimestamp () {
  var now = new Date();
  var year = now.getYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
    // var sec = now.getSeconds();
    
    return year + "_" + month + "_" + day + "_" + hour + min;
  }

// スプレッドシートのメニューからPDF作成用の関数を実行出来るように、「スクリプト」というメニューを追加。
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [       
  {
    name : "Create PDF",
    functionName : "myFunction"
  }
  ];
  sheet.addMenu("スクリプト", entries);
};