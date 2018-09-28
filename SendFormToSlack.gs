function sendToSlack(body, channel) {
  var url = "https://hooks.slack.com/services/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";
  var data = { "channel" : channel, "username" : "Googleフォーム Bot", "text" : body, "icon_emoji" : ":date: " };
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function onFormSubmit(e){

  var body = "<!channel> 営業ツールを更新しました\n"; 
  var applicant = "";
  var itemResponse = e.response.getItemResponses();

  for (var j = 0; j < itemResponse.length; j++){    
    var formData = itemResponse[j];
    var title = formData.getItem().getTitle();
    var response = formData.getResponse();

    switch (title) {
      case "変更日":
        date = response;
        break;
      case "資料名":
        name = response;
        break;
      case "変更箇所":
        a = response;
        break;
      case "変更理由":
        b = response;
        break;
      case "担当者":
        c = response;
        break;
      default:
        break;
    }
  }
  var bodyPublic =  body + "日付:" + date + "\n資料名:" + name + "\n\n変更箇所:" + a + "\n\n変更理由:" + b + "\n\n担当者:" + c ;
  sendToSlack(bodyPublic, "#eigyo_honbu_oshaberi");
}
