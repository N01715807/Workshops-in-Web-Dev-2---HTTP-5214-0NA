// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgDu4v1e8FOd_MgGPx4qtXQx213AIv9Ss",
  authDomain: "test-3729b.firebaseapp.com",
  databaseURL: "https://test-3729b-default-rtdb.firebaseio.com",
  projectId: "test-3729b",
  storageBucket: "test-3729b.appspot.com", 
  messagingSenderId: "570202398934",
  appId: "1:570202398934:web:5e4123311473569fac6977"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

//fectch all current messages
const messages = ref(database,"/messages")

onValue(messages, (snapshot) => {
    const ul = document.getElementById("messages");
    ul.innerHTML = "";

    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        console.log(childKey);
        console.log(childData);

        /*
        const li = document.createElement("li");
        li.textContent = childData.name + " ~ " + childData.message;
        ul.appendChild(li);
        */

        const text = document.createTextNode(
            childData.message + "~" +
            childData.name
        );
        const li = document.createElement("li");
        li.appendChild(text);
        ul.appendChild(li);
    });
});

const add = document.getElementById("add");
add.addEventListener("click", function () {
    const name = document.getElementById("name").value; 
    const message = document.getElementById("message").value;

    const newMessage = push(messages);
    set(newMessage, {
        name: name,
        message: message,
        createdAt: serverTimestamp() 
    });
});