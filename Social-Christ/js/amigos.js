
function misAmigos(){
    let doc = firebase.auth().currentUser.uid;
    let amigoId = friend.id;
    database.collection("users").doc(doc).collection("friends").get().then((e) =>{
        e.forEach((element) =>{
            console.log(element.id);
        })
    })
}