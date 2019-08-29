var database = firebase.database().ref(`/`);
var localData = localStorage.getItem(`currenUserData`);
localData = JSON.parse(localData);
var chatbtnid = localStorage.getItem(`chatBtnID`);
chatbtnid = JSON.parse(chatbtnid)
var identity = chatbtnid;

var d = new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
let currentItime = d; // write this to the document
let messageInput = document.getElementById(`messagearea1`);
document.getElementById("messagearea2").addEventListener(`click`, sentMessage => {
    alert("working")
    let messageObj1 = {
        message: messageInput.value,
        from: localData.name,
        time: currentItime,
        flag: "true",
    }

    let messageObj2 = {
        message: messageInput.value,
        from: localData.name,
        time: currentItime,
    }
    let notification = {
        name: localData.name,
        messageFrom: chatbtnid,
    }


    database.child("Users/" + chatbtnid + "/" + localData.id + "/").push(messageObj1);
    database.child("Users/" + localData.id + "/" + chatbtnid + "/").push(messageObj2);
    database.child("Users/" + chatbtnid + "/" + "notifiation").push(notification)
})


database.child("Users/" + localData.id + "/" + chatbtnid).on("child_added", getMessage => {
    let text = getMessage.val();
    console.log(text.message)

    let showmessage = document.getElementById("nav");
   
    let mainBox = document.createElement("p");
    mainBox.setAttribute("id", "mainbox")
    showmessage.appendChild(mainBox)
    let messagebox = document.createElement("p");
    messagebox.setAttribute("id", "messagebox")
    messagebox.innerHTML = text.message;
    if (text.flag === undefined) {
        messagebox.id = "messagebox"
    }
    else {
        messagebox.id = "replybox";
    }
    mainBox.appendChild(messagebox);
    let showTime = document.createElement("p");
    showTime.setAttribute("id", "showtime")
    showTime.innerHTML = text.time;
    messagebox.appendChild(showTime)

})
var count = 0;
database.child('Users/' + localData.id + "/" + 'notifiation/').on('child_added', notify => {
    count++;
    let notifyvalue = notify.val();
    console.log(notifyvalue)
    // if(notifyvalue.messageFrom !==localData.id){
    document.getElementById('count').innerHTML = count;
    var alertbox = document.getElementById('alertbox');
    var notifyText = document.createElement('p');
    notifyText.setAttribute('id', 'text');
    notifyText.innerHTML = notifyvalue.name + " send a message to you";
    let image = document.createElement('img');
    image.setAttribute('id', 'image');
    image.setAttribute('src', "./img/avatar.png");
    notifyText.appendChild(image)
    alertbox.appendChild(notifyText)
    // }

})
