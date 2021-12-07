let todoElement = "";
// listオブジェクトからhtml要素を作成
let makeTodoList = (list) => {
  list.forEach((element) => {
    todoElement = todoElement + "<li>" // リスト開始タグ
    todoElement = todoElement + '<input type="radio" name="list">' // ラジオボタン
    todoElement = todoElement + element["title"] // タイトル
    todoElement = todoElement + "</li>" // リスト終了タグ
    if ("subList" in element) {
      todoElement = todoElement + "<ul>";
      makeTodoList(element["subList"]);
      todoElement = todoElement + "</ul>";
    }
  })
};
// todoList テンプレート作成
let maketemplate = () => {
  let template = JSON.stringify({"version":"1.00","list":[]});
  localStorage.setItem('todoList', template);
}
// localstorageチェック
let todoList = localStorage.getItem("todoList");
todoList = JSON.parse(todoList);
if (todoList) {
  makeTodoList(todoList["list"]);
  $('#todoList').append(todoElement);
} else {
  maketemplate();
}

$('#rootAttribute').on('click', function() {
  var target = '<li>' + $('#inputToDo').val() + '</li>';
  $('#todoList').append(target);
  $('#inputToDo').val('');
});
