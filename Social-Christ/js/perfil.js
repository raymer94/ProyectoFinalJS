
function editarPerfil(){
    alert("editando perfil");
let form = document.querySelectorAll("#formularioModal");
let user = firebase.auth().currentUser.uid;
database.collection("users").doc(user).update({
    username: form[0][0].value,
    ocupacion: form[0][1].value,
    informacionPersonal: form[0][2].value,
    lenguaje1: form[0][3].value,
    lenguaje2: form[0][4].value
 }).then((res)=>{

 }).catch((err)=>{
     alert("no se actualizaron los datos" + err)
 });

}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
          let user = firebase.auth().currentUser.uid;
        database.collection("users").doc(user).onSnapshot((on) => {  
            console.log("Current data: ", on.data().username);
            $("#nombre").html(on.data().username);
            $("#nombreP").html(on.data().username);
            $("#ocupacion").html(on.data().ocupacion);
            $("#ocupacionP").html(on.data().username);
            $("#informacionPersonal").html(on.data().informacionPersonal);
            $("#lenguaje").html(on.data().lenguaje1);
            $("#lenguaje2").html(on.data().lenguaje2);
        
            });
        resolve(user);
      }, 1000);
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();



