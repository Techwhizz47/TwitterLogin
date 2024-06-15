firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      var uid = user.uid;
      console.log(user);      
      firebase.firestore().collection('users').doc(uid).get().then((userDoc)=>{
        let userName = userDoc.data().userName;
        console.log(userName);
        document.querySelector('#usrnme').innerText = userName;
      })
    } else {
      // User is signed out
      window.location.href = '/signup.html';
    }
});

document.getElementById('logout').onclick = function(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "/signup.html"
    }).catch((error) => {
        // An error happened.
    });
}