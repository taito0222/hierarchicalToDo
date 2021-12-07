let todoElement = "";
let todoList = {};
let todoNo = 0;
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
}
// todoListの削除
let deleteTodoList = (deleteNo) => {
  let tempList = [];
  let recursive = (list, deleteNo) => {
    todoNo++;
    if (deleteNo != list["todoNo"]) {
      let pushList = {"title":"","todoNo":""};
      pushList["title"] = list["title"];
      pushList["todoNo"] = String(todoNo);
      tempList.push()
    }
    list.forEach((element) => {
      if ("list" in element) {
        recursive(element["list"]);
      }
    })
  }
  todoNo = 0;
  recursive(todoList["list"], deleteNo);
  todoList["list"] = tempList;
}
// localstorage取得
let getLocalStorage = () => {
  todoList = JSON.parse(localStorage.getItem("todoList"));
}
// localstorage登録
let setLocalStorage = () => {
  let setJSON = JSON.stringify(todoList);
  localStorage.setItem("todoList", memoryobj);
}
// localstorageチェック
getLocalStorage();
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
// 削除ボタン押下時
$('#remove').on('click', function() {
  getLocalStorage();
  let deleteTodoNo = $('[name=list]:checked').val();
  deleteTodoList(deleteTodoNo);
  setLocalStorage();
  makeTodoList(todoList["list"]);
});
