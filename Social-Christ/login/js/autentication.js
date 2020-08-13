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
            if(location.pathname != "/ProyectoFinalJS/Social-Christ/login.html")
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

function agregarDatosUsuario() {
    let doc = firebase.auth().currentUser.uid;
    database.collection("users").doc(doc).set({
        username: "",
        ocupacion: "",
        informacionPersonal: "",
        lenguajes: "",
        imagenPerfilUrl: "",
        imagenFondoUrl: "",
        imageNamePerfil: "",
        imageNameFondo: ""
    }).then((res) => {
        console.log("coleccion agregada");
    }).catch((err) => {
        console.log("ha ocurrido un error: ", err);
    });

}

function registrer() {
    let email = document.getElementById("emailR").value;
    let password = document.getElementById("passR").value;
    let passwordConfirm = document.getElementById("passRR").value;
    if(password == passwordConfirm)
    {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        alert("usuario agregado");
  
    }).catch(function (error) {
        alert(error);
    });
    let doc = firebase.auth().currentUser.uid;
    database.collection("users").doc(doc).set({
        username: "",
        ocupacion: "",
        informacionPersonal: "",
        lenguajes: "",
        imagenPerfilUrl: "",
        imagenFondoUrl: "",
        imageNamePerfil: "",
        imageNameFondo: ""
    });
    window.location.href = "login.html";
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
