/*
 * Global Variables
 */

// Form URL
var formURL = 'https://docs.google.com/forms/d/10HYMYnuwuXKQZ42RArALhIknpj9WoT1K-_3f2TnB0eI/edit';　//フォームの編集画面のURL
// Sheet name used as destination of the form responses
var sheetName = 'ビザ確認フォーム_18夏（仮）';　//フォームの回答先シート名
/*
 * Name of the column to be used to hold the response edit URLs 
 * It should match exactly the header of the related column, 
 * otherwise it will do nothing.
 */
var columnName = 'Edit Url' ; //出力したい列名を入力
// Responses starting row
var startRow = 2;

function getEditResponseUrls(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues(); 
  var columnIndex = headers[0].indexOf(columnName);
  var data = sheet.getDataRange().getValues();
  var form = FormApp.openByUrl(formURL);
  for(var i = startRow-1; i < data.length; i++) {
    if(data[i][0] != '' && data[i][columnIndex] == '') {
      var timestamp = data[i][0];
      var formSubmitted = form.getResponses(timestamp);
      if(formSubmitted.length < 1) continue;
      var editResponseUrl = formSubmitted[0].getEditResponseUrl();
      sheet.getRange(i+1, columnIndex+1).setValue(editResponseUrl);
    }
  }
}