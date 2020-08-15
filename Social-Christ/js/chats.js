var database = firebase.firestore();
var doc;
var UsuariosList = [];
var amigosList = [];
var dataAmigo = [];

function callUsersData(){
    return new Promise(()=>{
        setTimeout(() => {         
            doc = firebase.auth().currentUser.uid;
            //enviar mensaje
            // let docRef = database.collection('users').doc(doc);
            
            // docRef.collection("friends").doc("vAXX90kHXPMbhHi5c01WZrZA0Y63").update({
            //     message: firebase.firestore.FieldValue.arrayUnion(
            //         {id: doc, nombre: "prueba nombre", message: "este es el mensaje de nuevo"}
            //         )
            // })

                //llena lista usuarios con data 
                database.collection("users").get().then((e) => {
                    e.forEach((element) => {
                        UsuariosList.push(element);                    
                    })
                })

            //llena lista de amigos
            database.collection("users").doc(doc).collection("friends").get().then((e) => {
                e.forEach((element) => {
                    dataAmigo.push(UsuariosList.filter(user => user.id == element.id))
                    amigosList.push(element.id);                    
                })
            })
            
        },1000)
    })
}

async function callUsers(){
    await callUsersData();
}
callUsers();

function callChatsData(){
    return new Promise(()=>{
        setTimeout(() => {         
            doc = firebase.auth().currentUser.uid;
            //enviar mensaje
            // let docRef = database.collection('users').doc(doc);
            
            // docRef.collection("friends").doc("test").update({
            //     message: firebase.firestore.FieldValue.arrayUnion(
            //         {id: doc, nombre: "prueba nombre", message: "este es el mensaje 4"}
            //         )
            // })
            
          let pp = database.collection("friends").doc("test");
        console.log(pp);
        //    dd.onSnapshot((on)=> {
        //         console.log(on.data().message)
        //     })
              
            
        },1000)
    })
}

async function callUsersChats(){
    await callChatsData();
}
callUsersChats();

function pintar(){
    return new Promise(()=>{
        setTimeout(() => {         
                // dataAmigo.forEach(element => {
                     //let urlFoto = element[0].data().imagenPerfilUrl == "" ? "./images/usuario.jpg" : element[0].data().imagenPerfilUrl;
                //cargar chat individuales
                     //      document.getElementById("listaAmigos").innerHTML += `<li class="active">
                //      <a href="#${element[0].id}" data-toggle="tab">
                //        <div class="contact">
                //            <img src="${urlFoto}" alt="" class="profile-photo-sm pull-left"/>
                //            <div class="msg-preview">
                //                <h6>${element[0].data().username}</h6>
                //                <p class="text-muted">Hi there, how are you</p>
                //            <small class="text-muted">a min ago</small>
                //            <div class="chat-alert">1</div>
                //            </div>
                //        </div>
                //      </a>
                //    </li>`;   
                   //leer mensajes          
            database.collection("users").doc("F5Z1xI8rL2c0p3t4QUbBrmDJSU72").collection("friends").doc("MPqR8pYaTUfsyMP3MdXoZ7PIisJ3").onSnapshot((on)=>{
                //console.log(on.data().message);
                let mensajes = Array.from(on.data().message);
                console.log("este es el arreglo de mensajes" + mensajes)
                //mensajes.forEach(element => {console.log("prueba con " + element)});
                $("#listaChatDentro").remove();
                document.getElementById("chatsMessages").innerHTML += `
                    <div class="tab-pane active" id="">
                      <div class="chat-body">
                          <ul class="chat-message" id="listaChatDentro">
                       
                                                         
                      	</ul>
                      </div>
                    </div>`
                for (let index = 0; index < mensajes.length; index++) {  
                    let img = `<img src="${on.data().message[index].urlFoto}"/>`;                 
                    document.getElementById("listaChatDentro").innerHTML += `
                    <li class="${on.data().message[index].id == doc ? "right" : "left"}">
                        <img src="${on.data().message[index].foto == "" ?  "./images/usuario.jpg" : on.data().message[index].foto}" alt="" class="profile-photo-sm pull-${on.data().message[index].id == doc ? "right" : "left"}" />
                            <div class="chat-item">
                                <div class="chat-item-header">
                                    <h5>${on.data().message[index].nombre}</h5>
                                    <small class="text-muted">3 days ago</small>
                                </div>
                                <p>${on.data().message[index].urlFoto != null ? img : on.data().message[index].message}</p>
                            </div>
                    </li>`
                }
                
            })  
                 //});
        },2000)
    })
}

async function pintarAmigos(){
    await pintar();
}

pintarAmigos();

database.collection("users").onSnapshot((e) => {
    e.forEach(element => {      
  if(firebase.auth().currentUser.uid == element.id){
    document.getElementById("usurName").innerHTML = element.data().username;
    $("#imgUser").attr("src", element.data().imagenPerfilUrl == "" ?  "./images/usuario.jpg": element.data().imagenPerfilUrl);
  }
});
});

function EnviarMensaje(){
    //enviar mensaje
    let mensaje = document.getElementById("MensajeChat").value;
    let imagen = document.getElementById("imgValue").files[0];
    if(imagen != null){
        SubirImg(imagen)
    }
    else{
            database.collection('users').doc(doc).get().then((on)=>{
                currentUser = on.data().username;
                database.collection('users').doc("F5Z1xI8rL2c0p3t4QUbBrmDJSU72").collection("friends").doc("MPqR8pYaTUfsyMP3MdXoZ7PIisJ3").update({
                        message: firebase.firestore.FieldValue.arrayUnion(
                            {id: doc, nombre: on.data().username, message: mensaje, foto: on.data().imagenPerfilUrl}
                            )
                    })
            });
            //console.log(currentUser)
            document.getElementById("MensajeChat").value = "";
        }
}

function cargarImgChat(){
    document.getElementById("imgValue").click();
}

function enviarImgChat(){
    alert("Imagen cargada, pulse enviar para mostrar en el chat");
}

function SubirImg(imagen){
    let name = imagen.name;
    let ref = firebase.storage().ref();
  const metadata = {
      contentType: imagen.type
  }

  const task = ref.child(name).put(imagen, metadata); 
  //ref.child(name).getDownloadURL().then(url => console.log(url));
  task.then(snapShot => snapShot.ref.getDownloadURL())
  .then(url => {
    database.collection('users').doc(doc).get().then((on)=>{
        currentUser = on.data().username;
        database.collection('users').doc("F5Z1xI8rL2c0p3t4QUbBrmDJSU72").collection("friends").doc("MPqR8pYaTUfsyMP3MdXoZ7PIisJ3").update({
                message: firebase.firestore.FieldValue.arrayUnion(
                    {id: doc, nombre: on.data().username, urlFoto: url, foto: on.data().imagenPerfilUrl}
                    )
            })
    });
  });
}