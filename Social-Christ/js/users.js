var database = firebase.firestore();

function agregarDatosUsuario()
{
    let doc = firebase.auth().currentUser.uid;
    database.collection("users").doc(doc).set({
        username: "",
        ocupacion: "",
        informacionPersonal: "",
        lenguajes: "",
        imagenPerfilUrl: "",
        imagenFondoUrl: ""  
      }).then((res)=>{
       
      }).catch((err)=>{
          console.log("ha ocurrido un error: ", err);
      });
    
}
