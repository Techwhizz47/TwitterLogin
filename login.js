document.getElementById('sign').onclick = ()=>{
    document.getElementById('login').style.display = 'block'
}

document.getElementById('close2').onclick = ()=>{
    document.getElementById('login').style.display = 'none'
}

document.getElementById('loginb').onclick = function(){
    let email = document.getElementById('emaill').value;
    let password = document.getElementById('passwordl').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
     }).then(()=>{window.location.href = "/home.html"})
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

}