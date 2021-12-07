let todoElement = "";
let todoNo = 0;
let todoList = "";
// listオブジェクトからhtml要素を作成
let makeTodoList = (list) => {
  list.forEach((element) => {
    todoNo++;
    console.log(todoNo);
    todoElement = todoElement + "<li>" // リスト開始タグ
    todoElement = todoElement + '<input type="radio" name="list" value="' // ラジオボタン
    todoElement = todoElement + String(todoNo) + '">'
    todoElement = todoElement + element["title"] // タイトル
    todoElement = todoElement + "</li>" // リスト終了タグ
    if ("list" in element) {
      todoElement = todoElement + "<ul>";
      makeTodoList(element["list"]);
      todoElement = todoElement + "</ul>";
    }
  })
};
// todoList テンプレート作成
let maketemplate = () => {
  let template = JSON.stringify({"version":"1.00","list":[]});
  localStorage.setItem("todoList", template);
}
// localstorage取得
let getLocalStorage = () => {
  let localJSON = localStorage.getItem("todoList");
  todoList = JSON.parse(localJSON);
}
// localstorage登録
let setLocalStorage = () => {
  let memoryobj = JSON.stringify(todoList);
  localStorage.setItem("todoList", memoryobj);
}
// localstorageチェック
todoList = localStorage.getItem("todoList");
todoList = JSON.parse(todoList);
if (todoList) {
  makeTodoList(todoList["list"]);
  $('#todoList').append(todoElement);
} else {
  maketemplate();
}
// 追加ボタン押下時
$('#attribute').on('click', function() {
  getLocalStorage();
  let radioValue = $('[name=list]:checked').val();
  if (radioValue) {
  } else {
    let pushList = {"title":""};
    pushList["title"] = $('#inputToDo').val();
    todoList["list"].push(pushList);
  }
  setLocalStorage();
  makeTodoList(todoList["list"]);
});
