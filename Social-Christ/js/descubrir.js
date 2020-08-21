var database = firebase.firestore();
var amigos = [];

function callFriendsData(){
    return new Promise(()=>{
        setTimeout(() => {
            let doc = firebase.auth().currentUser.uid;            
            database.collection("users").doc(doc).collection("friends").get().then((e) => {
                e.forEach((element) => {
                  amigos.push(element.id);
                    console.log(element.id);
                    $(`#${element.id}`).prop('disabled', true);
                })
            })
            document.getElementById("seguidores").innerHTML = `<i class="ion ion-android-person-add"></i> ${amigos.length} followers`;
        },1000)
    })
}

async function callFriends(){
    await callFriendsData();
}
callFriends();

database.collection("users").onSnapshot((e) => {
    e.forEach(element => {
        document.getElementById("userList").innerHTML += `<div class="people-nearby">
    <div class="nearby-user">
      <div class="row">
        <div class="col-md-2 col-sm-2">
          <img src="${element.data().imagenPerfilUrl == "" ?  "./images/usuario.jpg": element.data().imagenPerfilUrl}" alt="user" class="profile-photo-lg" />
        </div>
        <div class="col-md-7 col-sm-7">
          <h5><a href="#" class="profile-link">${element.data().username}</a></h5>
          <p>${element.data().ocupacion}</p>
        </div>
        <div class="col-md-3 col-sm-3"> 
          <button class="btn btn-primary pull-right" onclick="addFriend(${element.id})" id="${element.id}">Add Friend</button>
        </div>
      </div>
    </div>
  </div>`;
  document.getElementById("userOnline").innerHTML += `<li><a href="chats.html" title="${element.data().username}">
  <img src="${element.data().imagenPerfilUrl == "" ?  "./images/usuario.jpg": element.data().imagenPerfilUrl}" alt="user" class="img-responsive profile-photo" />
  <span class="online-dot"></span></a></li>`;

  if(firebase.auth().currentUser.uid == element.id){
    document.getElementById("usurName").innerHTML = element.data().username;
    $(`#${element.id}`).prop('disabled', true);
    $("#imgUser").attr("src", element.data().imagenPerfilUrl == "" ?  "./images/usuario.jpg": element.data().imagenPerfilUrl);
  }
});
callFriends();
});
function addFriend(friend)
{
    let amigoId = friend.id;
    let doc = firebase.auth().currentUser.uid;  
    database.collection("users").doc(doc).collection("friends").doc(amigoId).set({
        
      }).then((res)=>{
        alert("se ha agregado a tus amigos");
        location.reload();
      }).catch((err)=>{
          console.log("ha ocurrido un error: ", err);
      });
}


