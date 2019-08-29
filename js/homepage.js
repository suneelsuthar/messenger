var database = firebase.database().ref(`/`);
var localData = localStorage.getItem("activeUser");
localData = JSON.parse(localData);




database.child(`Users/`).on(`child_added`, users => {
    let value = users.val();
    if(localData.id !== users.key){
    let htmlDIv = document.getElementById(`container`);

    let hr = document.createElement(`hr`);
    htmlDIv.appendChild(hr);

    let innerDiv = document.createElement(`div`);
    innerDiv.setAttribute(`class`, `w3-cell-row`);
    htmlDIv.appendChild(innerDiv);

    let imgDiv = document.createElement(`div`);
    imgDiv.setAttribute(`class`, `"w3-cell`);
    imgDiv.setAttribute(`style`, `width:30%`)
    imgDiv.setAttribute(`id`, `imgDiv`)
    innerDiv.appendChild(imgDiv);

    let img = document.createElement(`img`);
    img.setAttribute(`class`, `w3-circle`);
    img.setAttribute(`id`, `img`);
    img.setAttribute(`src`, `img/avatar.png`);
    imgDiv.appendChild(img);

    let dataDiv = document.createElement(`div`);
    dataDiv.setAttribute(`class`, `w3-cell w3-container`);
    dataDiv.setAttribute(`id`, `dataDiv`)
    innerDiv.appendChild(dataDiv);

    let h3 = document.createElement(`h3`);
    h3.setAttribute(`id`, `name`);
    h3.innerHTML = value.name;
    dataDiv.appendChild(h3);

    let p = document.createElement(`p`);
    p.setAttribute(`style`, `display:inline`)
    dataDiv.appendChild(p);

    let chatbtn = document.createElement(`input`);
    chatbtn.setAttribute(`type`, `button`);
    chatbtn.setAttribute(`class`, `btn btn-info`)
    chatbtn.setAttribute(`id`, users.key)
    chatbtn.setAttribute(`value`, `CHAT ME NOW`);
    chatbtn.setAttribute(`style`, `font-family: 'Patua One', cursive;`)
    p.appendChild(chatbtn);

    chatbtn.addEventListener(`click`, () => {
        localStorage.setItem("chatBtnID", JSON.stringify(chatbtn.id))
        window.location.href = "chatpage.html"
    })}
})
database.child("Users/" + localData.id + "/").on(`value`, userData => {
    localStorage.setItem("currenUserData", JSON.stringify(userData.val()))
    document.getElementById(`name`).innerHTML = "<span>Name: </span>" + userData.val().name;
    document.getElementById(`age`).innerHTML = "<span>Age: </span>" + userData.val().age;
    document.getElementById(`gender`).innerHTML = "<span>Gender: </span>" + userData.val().gender;
    document.getElementById(`email`).innerHTML = "<span>Email: </span>" + userData.val().email;
    document.getElementById(`country`).innerHTML = "<span>Country: </span>" + userData.val().country;
})

document.getElementById("close").addEventListener("click", () => {
    document.getElementById(`container`).style.display = "block";
    window.location.reload()
})


