// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  remove,
  onChildRemoved,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//この辺に書いていきます
const db = getDatabase(app); // RealtimeDatabase使うよ
const dbRef = ref(db, "dev245"); // RealtimeDatabase”chat“を使うよ

//エンターキーを押したら入力
//テキストボックスの中身をtextに代入
// function keyDown() {
//   // const input_text = $("#input_text").val();
//   console.log("keyDown");
// }

//送信処理を記述
$("#send").on("click", function () {
  // alert("kore");

  //id="text"の場所を取得します
  const input_text = $("#input_text").val();
  // console.log(input_text);

  //textが空欄でなければ実行
  if (input_text == "") {
  } else {
    //データの塊を作ります
    //msgという名前で塊を作る
    //値はunameという鍵、textという鍵
    const msg = {
      // uname: $("#uname").val(),
      input_text: $("#input_text").val(),
    };

    //作成したデータの塊をfirebaseに送信(＝保存)する
    //保存
    const newPostRef = push(dbRef);
    //firebaseのおまじない
    set(newPostRef, msg);

    //送信後に入力欄を空にする
    // $("#uname").val("");
    $("#input_text").val("");
    // $("#uname").focus();

    // send送信イベントこの下消さない;
  }
});

//データ受信
onChildAdded(dbRef, function (data) {
  const msg = data.val();
  console.log(msg, "取得したデータの塊");
  const key = data.key;
  console.log(key, "データの塊にアクセス");

  //es6のテンプレートリテラルを使う
  let h = `
    <div class="line__right">
      <div class="text">${msg.input_text}</div>
    </div>
   `;

  //htmlに埋め込む
  $("#output").append(h);
});

$("#input_text").on("keydown", function (e) {
  console.log(e.keyCode, "イベントのデータの塊");
});
