// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDNbLyTFWeDdYtjWvyEy_3nA6-q37KkX9Q",
    authDomain: "chatjs-a84dd.firebaseapp.com",
    databaseURL: "https://chatjs-a84dd.firebaseio.com",
    projectId: "chatjs-a84dd",
    storageBucket: "chatjs-a84dd.appspot.com",
    messagingSenderId: "394016409984",
    appId: "1:394016409984:web:ad73ea13fdec4303349965"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//funcion que verifica si el usuario esta logueado
function verifcacionUser(){
    return new Promise(resolve =>{
        setTimeout(()=>{
            if(location.pathname != "/login.html")
            {
                let user = firebase.auth().currentUser;
                if(user == null || user == undefined)
                {
                    window.location.href = "login.html"
                }
            } resolve()
        }, 1000)
    })
}
async function vericall() {
    console.log('calling');
    const result = await verifcacionUser();
    console.log(result);
    // expected output: "resolved"
  }
  vericall();


function UploadImage(){
    let ref = firebase.storage().ref();
    let file = document.getElementById("image").files[0];
    let name = file.name;
    const metadata = {
        contentType: file.type
    }

    ref.child(name).put(file, metadata); 
    //ref.child(name).getDownloadURL().then(url => console.log(url));
    // task.then(snapShot => snapShot.ref.getDownloadURL())
    // .then(url => console.log(url));
    // console.log(file);
    //pintar IMG
    //document.getElementById().src = URL
}

function registrer() {
    let email = document.getElementById("emailR").value;
    let password = document.getElementById("passR").value;
    let passwordConfirm = document.getElementById("passRR").value;
    if(password == passwordConfirm)
    {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        alert("usuario agregado");
        agregarDatosUsuario();

    }).catch(function (error) {
        alert(error);
    });
    }
    else alert("Las contraseñas no coinciden");
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    if(email != "" && password != "")
    {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        alert("usuario logeado");
        window.location.href = "perfil.html"
        

    }).catch(function (error) {
        alert(error);
    });
    }
    else alert("Usuario o clave incorrecta");
}

function signOut()
{
    firebase.auth().signOut();
    window.location.href = "login.html"
}
