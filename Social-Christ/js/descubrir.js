var database = firebase.firestore();


function callFriendsData(){
    return new Promise(()=>{
        setTimeout(() => {
            let doc = firebase.auth().currentUser.uid;            
            database.collection("users").doc(doc).collection("friends").get().then((e) => {
                e.forEach((element) => {
                    console.log(element.id);
                    $(`#${element.id}`).prop('disabled', true);
                })
            })
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
    });
});
function addFriend(friend)
{
    let amigoId = friend.id;
    database.collection("users").doc(doc).collection("friends").doc(amigoId).set({
        
      }).then((res)=>{
        alert("se ha agregado a tus amigos");
      }).catch((err)=>{
          console.log("ha ocurrido un error: ", err);
      });
}


