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
            if(location.pathname != "/Social-Christ/login.html")
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

 function agregarDatosUsuario(userColection, email, password) {
    return new Promise(resolve =>{
        setTimeout(()=>{
            firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
                doc = res.user.uid;
                userColection.doc(doc).set({
                    username: "",
                    ocupacion: "",
                    informacionPersonal: "",
                    imagenPerfilUrl: "",
                    imagenFondoUrl: "",
                    imageNamePerfil: "",
                    imageNameFondo: "",
                    lenguaje1: "",
                    lenguaje2: ""
                });
                alert("usuario agregado");
                document.getElementById("emailR").value = "";
                document.getElementById("passR").value = "";
                document.getElementById("passRR").value = "";
          
            }).catch(function (error) {
                alert(error);
            });
            resolve()
        }, 1000)
    })
}

async function registrer() {
    let email = document.getElementById("emailR").value;
    let password = document.getElementById("passR").value;
    let passwordConfirm = document.getElementById("passRR").value;
    var doc;
    let userColection = database.collection("users");
    if(password == passwordConfirm)
    {    
      await agregarDatosUsuario(userColection, email, password);
      
    }
    else alert("Las contraseñas no coinciden");
    //window.location.href = "login.html";
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
