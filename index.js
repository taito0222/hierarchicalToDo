let todoElement = "";
let todoNo = 0;
let todoList = "";
// ToDoリストの更新
let makeTodoList = (list) => {
  todoNo = 0;
  todoElement = ""
  $('#todoList').empty();
  makeHTMLElement(list);
  $('#todoList').append(todoElement);
}
// listオブジェクトからhtml要素を作成
let makeHTMLElement = (list) => {
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
      makeHTMLElement(element["list"]);
      todoElement = todoElement + "</ul>";
    }
  })
};
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
} else {
  // 初回利用時
  let template = JSON.stringify({"version":"1.00","list":[]});
  localStorage.setItem("todoList", template);
}
// 追加ボタン押下時
$('#attribute').on('click', function() {
  getLocalStorage();
  let radioValue = $('[name=list]:checked').val();
  if (radioValue) {
  } else {
    let pushList = {"title":"","todoNo":""};
    pushList["title"] = $('#inputToDo').val();
    pushList["todoNo"] = String(todoNo + 1);
    todoList["list"].push(pushList);
  }
  setLocalStorage();
  makeTodoList(todoList["list"]);
});
