document.getElementById('google').onclick = ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    // firebase.auth().languageCode = 'it';
    // To apply the default browser preference instead of explicitly setting it.
    firebase.auth().useDeviceLanguage();

    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
    firebase.firestore().collection('users').doc(user.uid).set({
        userName: user.displayName, 
        userEmail: user.email,
        userId: user.uid,
        timestamp: new Date().getTime()
    }).then(()=>{
        window.location.href = '/home.html';
    }).catch((error) =>{
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorMessage);
    })
  }).catch((error) => { 
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

document.getElementById('create').onclick = ()=>{
    document.getElementById('signup').style.display = 'block';
}


document.getElementById('close1').onclick = ()=>{
    document.getElementById('signup').style.display = 'none';
}

document.getElementById('signupb').onclick = function () {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            firebase.firestore().collection('users').doc(user.uid).set({
                userName: name, 
                userEmail: email,
                userId: user.uid,
                timestamp: new Date().getTime()

            }).then(()=>{
                window.location.href = "/home.html";
            })
            .catch((error) =>{
                var errorCode = error.code;
                var errorMessage = error.message;

                console.error(errorMessage);
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.error(errorMessage);
        });
}