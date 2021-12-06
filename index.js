let todoElement = "";
$.ajax({
  type: "GET",
  url: "sample.json", // ファイルパス（相対パス）
  dataType: "json", // ファイル形式
  async: false // 非同期通信フラグ
}).then(
  function (json) {
    localStorage.setItem('todoList', json);
    let reflexive = (list) => {
      list.forEach((element) => {
        todoElement = todoElement + "<li>" + element["title"] + "</li>"
        if ("subList" in element) {
          todoElement = todoElement + "<ul>"
          reflexive(element["subList"]);
          todoElement = todoElement + "</ul>"
        }
      });
    };
    var todoList = json["list"]
    reflexive(todoList);
    $('#todoList').append(todoElement);
  },
  function () {
    console.log("読み込みに失敗しました");
  }
);
$('#inputButton').on('click', function() {
  var target = '<li>' + $('#inputToDo').val() + '</li>';
  $('ul').append(target);
  $('#inputToDo').val('');
});
