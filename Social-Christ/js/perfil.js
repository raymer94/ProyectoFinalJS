function editarPerfil(){
let form = document.querySelectorAll("#formularioModal");
let user = firebase.auth().currentUser.uid;
           UserDataUpdate(user, form)
}

function UserDataUpdate(user, form, img, url, name)
{
  if(form != 0)
  {
      database.collection("users").doc(user).update({
        username: form[0][0].value,
        ocupacion: form[0][1].value,
        informacionPersonal: form[0][2].value,
        lenguaje1: form[0][3].value,
        lenguaje2: form[0][4].value
    }).then((res)=>{
      alert("se actualizaron tus datos");
        $("#closeModalEditarPerfil").click();
    }).catch((err)=>{
        alert("no se actualizaron los datos" + err)
    });
  }
  else{
    if(img == "imgPerfil"){
        database.collection("users").doc(user).update({
          imagenPerfilUrl: url,
          imageNamePerfil: name
      }).then((res)=>{
        alert("se actualizo tu foto de perfil");
        $("#closeModalEditarFoto").click();
      }).catch((err)=>{
          alert("no se actualizaron los datos" + err)
      });
    }
    else 
    database.collection("users").doc(user).update({
      imagenFondoUrl: url,
      imageNameFondo: name
      }).then((res)=>{
        alert("se actualizo tu foto de fondo");
        $("#closeModalEditarFoto").click();
      }).catch((err)=>{
          alert("no se actualizaron los datos" + err)
      });
    } 
}

function UploadImage(){
  let ref = firebase.storage().ref();
  let file = document.getElementById("imgPerfilUpload").files[0];
  let file2 = document.getElementById("imgFondoUpload").files[0];
  if(file == undefined && file2 == undefined)
  {
    alert("Se debe de elegir al menos una foto");
  }
  else if(file != undefined && file2 != undefined)
  {
    alert("Se debe de elegir solo una foto para cambiar");
    document.getElementById("imgPerfilUpload").value = "";
    document.getElementById("imgFondoUpload").value = "";
  }
  else
  {
  let name = file2 == undefined ? file.name : file2.name;
  const metadata = {
      contentType: file2 == undefined ? file.type : file2.type
  }

  const task = ref.child(name).put(file2 == undefined ? file : file2, metadata); 
  //ref.child(name).getDownloadURL().then(url => console.log(url));
  task.then(snapShot => snapShot.ref.getDownloadURL())
  .then(url => {
    UserDataUpdate(firebase.auth().currentUser.uid, 0, file2 == undefined ? "imgPerfil" : "imgFondo", url, name);
    document.getElementById("imgPerfilUpload").value = "";
    document.getElementById("imgFondoUpload").value = "";
  });
  }
}

function solitarCambioPassWord()
{
  let claveNueva = $("#claveNueva").val(); 
  let claveNuevaConfirm = $("#claveNuevaConfirm").val();  
  if(claveNueva == "" && claveNuevaConfirm == ""){alert("Debe de llenar los campos"); return;}
  if(claveNueva == claveNuevaConfirm){changePassword(claveNueva);}
  else alert("Las contraseñas no coincide");
}

function changePassword(nuevaClave)
{
  var user = firebase.auth().currentUser;

  user.updatePassword(nuevaClave).then(function() {
    // Update successful.
    alert("Se ha cambiado su clave");
    $("#CloseModalClave").click();
  }).catch(function(error) {
    // An error happened.
    error = error.message == "Password should be at least 6 characters" ? "Su clave debe de tener minimo 6 caracteres" : error;
    alert("ha ocurrido un error: "+ error);
  });
}

function deleteImgProfile()
{
    // Create a reference to the file to delete
  let ref = $("#imgPerfil").attr("alt");
  let desertRef = firebase.storage().ref().child(ref);

  // Delete the file
  desertRef.delete();
  let user = firebase.auth().currentUser.uid;
  database.collection("users").doc(user).update({
    imagenPerfilUrl: "",
  });
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
          let user = firebase.auth().currentUser.uid;
        database.collection("users").doc(user).onSnapshot((on) => {  
            console.log("Current data: ", on.data());
            $("#nombre").html(on.data().username);
            $("#nombreP").html(on.data().username);
            $("#ocupacion").html(on.data().ocupacion);
            $("#ocupacionP").html(on.data().username);
            $("#informacionPersonal").html(on.data().informacionPersonal);
            $("#lenguaje").html(on.data().lenguaje1);
            $("#lenguaje2").html(on.data().lenguaje2);
            $("#imgPerfil").attr("src", on.data().imagenPerfilUrl == "" ? "./images/usuario.jpg" : on.data().imagenPerfilUrl);
            $("#imgPerfil").attr("alt",on.data().imageNamePerfil);
            $(".timeline-cover").css("background", `url(${on.data().imagenFondoUrl}) no-repeat`);

            //agregar informacion en el modal
            let form = document.querySelectorAll("#formularioModal")[0];
            let data = ["username","ocupacion","informacionPersonal","lenguaje1","lenguaje2"];
            for (let i = 0; i <= 4; i++) {
             form[i].value = on.data()[data[i]];
            }
            });
        resolve(user);
      }, 1000);
    });
  }
  //funcion que se mantiene escuchando la data
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();



