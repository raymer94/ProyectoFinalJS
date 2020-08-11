function editarPerfil(){
    alert("editando perfil");
let form = document.querySelectorAll("#formularioModal");
let user = firebase.auth().currentUser.uid;
           UserDataUpdate(user, form)
}

function UserDataUpdate(user, form, img, url)
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

    }).catch((err)=>{
        alert("no se actualizaron los datos" + err)
    });
  }
  else{
    if(img == "imgPerfil"){
        database.collection("users").doc(user).update({
          imagenPerfilUrl: url
      }).then((res)=>{
        alert("se actualizo tu foto")
      }).catch((err)=>{
          alert("no se actualizaron los datos" + err)
      });
    }
    else 
    database.collection("users").doc(user).update({
      imagenFondoUrl: url
      }).then((res)=>{
        alert("se actualizo tu foto")
      }).catch((err)=>{
          alert("no se actualizaron los datos" + err)
      });
    } 
}

function UploadImage(){
  let ref = firebase.storage().ref();
  let file = document.getElementById("imgPerfilUpload").files[0];
  let file2 = document.getElementById("imgFondoUpload").files[0];
  let name = file2 == undefined ? file.name : file2.name;
  const metadata = {
      contentType: file2 == undefined ? file.type : file2.type
  }
  
  const task = ref.child(name).put(file, metadata); 
  //ref.child(name).getDownloadURL().then(url => console.log(url));
  task.then(snapShot => snapShot.ref.getDownloadURL())
  .then(url => {
    UserDataUpdate(firebase.auth().currentUser.uid, 0, file2 == undefined ? "imgPerfil" : "imgFondo");
  });
  // console.log(file);
  //pintar IMG
  //document.getElementById("imgPerfilUpload").src = "https://www.w3schools.com/tags/img_girl.jpg"
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
            $("#imgPerfil").attr("src", on.data().imagenPerfilUrl);
            $(".timeline-cover").css("background", `url(${on.data().imagenFondoUrl}) no-repeat`);
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



