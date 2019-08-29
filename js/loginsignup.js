var database1 = firebase.database().ref("/")
document.getElementById("register").addEventListener("click", () => {
  let name = document.getElementById(`name`).value;
  let email = document.getElementById(`email`).value;
  let password = document.getElementById(`password`).value;
  let age = document.getElementById(`age`).value;
  let selectId = document.getElementById("country");
  let country = selectId.options[selectId.selectedIndex].value;
  let gender = $("input[name='gender']:checked").val();
  // data object
  let user = {
    name: name,
    age: age,
    country: country,
    gender: gender,
    email: email,
    password: password,
  }
  // signup firebase predefiend method
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      user.id = res.user.uid;
      database1.child(`Users/${res.user.uid}`).set(user);
      document.getElementById('id01').style.display = 'block'
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
})

// login
var email = document.getElementById("userEmail");
var password = document.getElementById("userPass");
document.getElementById("loginbutton").addEventListener("click", () => {
  // set in object
  alert("working")
  var postObj = {
    email: email.value,
    password: password.value
  }
  // sigin in firebase method
  firebase.auth().signInWithEmailAndPassword(postObj.email, postObj.password)
    .then((res) => {
      database1.child(`Users/${res.user.uid}`).once("value", snap => {
        var data = snap.val();
        postObj.id = snap.key;
        localStorage.setItem("activeUser", JSON.stringify(postObj))
        window.location.href = `homepage.html`
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
})




