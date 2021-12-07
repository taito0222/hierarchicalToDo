let todoElement = ""; // html要素
// listオブジェクトからhtml要素を作成
let makeTodoList = (list) => {
  list.forEach((element) => {
    todoElement = todoElement + "<li>" + element["title"] + "</li>"
    if ("subList" in element) {
      todoElement = todoElement + "<ul>"
      makeTodoList(element["subList"]);
      todoElement = todoElement + "</ul>"
    }
  });
};
// todoList テンプレート作成
let maketemplate = () => {
  let template = JSON.stringify({"version":"1.00","list":[]});
  localStorage.setItem('todoList', template);
}

let todoList = localStorage.getItem("todoList");
console.log(todoList);
// localstorageチェック
if (todoList) {
  makeTodoList(todoList);
  $('#todoList').append(todoElement);
} else {
  maketemplate();
}

$('#inputButton').on('click', function() {
  var target = '<li>' + $('#inputToDo').val() + '</li>';
  $('ul').append(target);
  $('#inputToDo').val('');
});
