function getFileListInFolder() {
  var url = 'https://drive.google.com/drive/folders/1aMMzi1vKumanWNjauTg35ejyG3BR3Xel', // URL of Google Drive folder.
      paths = url.split('/'), // Separate URL into an array of strings by separating the string into substrings. 
      folderId = paths[paths.length - 1], // Get a last element of paths array.
      folder = DriveApp.getFolderById(folderId),
      files = folder.getFiles(),
      list = [],
      rowIndex = 1, // The starting row of a range.
      colIndex = 1, // The starting row of a column.
      ss, sheet,range,
      sheetName = 'シート11';
  
  // Creating a data array from a files iterator.
  while(files.hasNext()) {
    var buff = files.next();
    list.push([buff.getName(), buff.getUrl()]);
  };
  
  ss = SpreadsheetApp.getActive();
  sheet = ss.getSheetByName(sheetName);
  range = sheet.getRange(rowIndex, colIndex, list.length, list[0].length);
  range.setValues(list);
}