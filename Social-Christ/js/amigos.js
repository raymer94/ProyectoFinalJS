var database = firebase.firestore();
var doc;
var UsuariosId = [];
var amigos = [];

function callUsersData(){
    return new Promise(()=>{
        setTimeout(() => {           
            database.collection("users").get().then((e) => {
                e.forEach((element) => {
                    UsuariosId.push(element.id);                    
                })
            })
        },1000)
    })
}

async function callUsers(){
    await callUsersData();
}
callUsers();

database.collection("users").onSnapshot((e) => {
    doc = firebase.auth().currentUser.uid;
    e.forEach(element => {      
  if(firebase.auth().currentUser.uid == element.id){
    document.getElementById("usurName").innerHTML = element.data().username;
    $("#imgUser").attr("src", element.data().imagenPerfilUrl == "" ?  "./images/usuario.jpg": element.data().imagenPerfilUrl);
  }
});
});

function callFriendsData(){
    return new Promise(()=>{
        setTimeout(() => {           
            database.collection("users").doc(doc).collection("friends").get().then((e) =>{
                e.forEach((element) =>{
                    console.log(element.id);
                    UsuariosId.forEach(users => {
                        if(users == element.id)
                        {
                            database.collection("users").doc(element.id).onSnapshot((on) => {  
                                console.log("este es el dato del amigo" + on.data().username);
                                amigos.push(on.data().username);
                                document.getElementById("seguidores").innerHTML = `<i class="ion ion-android-person-add"></i> ${amigos.length} followers`;
                                document.getElementById("friendsList").innerHTML += 
                                    `<div class="row">
                                        <div class="col-md-10 col-sm-6">
                                            <div class="friend-card">
                                                <img src="${on.data().imagenFondoUrl == "" ? "./images/usuario.jpg" : on.data().imagenFondoUrl}" alt="profile-cover" class="img-responsive cover" />
                                                <div class="card-info">
                                                <img src="${on.data().imagenPerfilUrl == "" ? "./images/usuario.jpg" : on.data().imagenPerfilUrl}" alt="user" class="profile-photo-lg" style="height: 155px; margin-top: -109px; width: 24%;" />
                                                <div class="friend-info">
                                                    <a onclick="eliminarAmigo('${element.id}')" class="pull-right text-green btn btn-danger" style="color: #fff;">eliminar</a>
                                                    <h5><a href="timeline.html" class="profile-link">${on.data().username}</a></h5>
                                                    <p>${on.data().ocupacion}</p>
                                                    <p>"${on.data().informacionPersonal}"</p>
                                                </div>
                                                </div>
                                            </div>
                                       </div>
                                    </div>`;
                            });
                        }
                    });                   
                })
            })
        },1000)
    })
}

async function callFriends(){
    await callFriendsData();
}
    callFriends();


function eliminarAmigo(friendId){
    database.collection("users").doc(doc).collection("friends").doc(friendId).delete().then(()=>{
        alert("Tu amigo se ha eliminado");
        location.reload();
    }).catch((err)=>{
        alert("error " + err);
    })
}

database.collection("users").onSnapshot((e) => {
    e.forEach(element => {
  document.getElementById("userOnline").innerHTML += `<li><a href="chats.html" title="${element.data().username}">
  <img src="${element.data().imagenPerfilUrl == "" ?  "./images/usuario.jpg": element.data().imagenPerfilUrl}" alt="user" class="img-responsive profile-photo" />
  <span class="online-dot"></span></a></li>`;
})
})
