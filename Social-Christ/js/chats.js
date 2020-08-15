var database = firebase.firestore();
var doc;
var UsuariosId = [];

function callUsersData(){
    return new Promise(()=>{
        setTimeout(() => {         
            doc = firebase.auth().currentUser.uid;
            let docRef = database.collection('users').doc(doc);
            
            docRef.collection("friends").doc("test").update({
                message: firebase.firestore.FieldValue.arrayUnion(
                    {nombre: "prueba nombre", message: "este es el mensaje 4"}
                    )
            })

           let dd = database.collection("friends").doc("test").valueChanges();
           
        //    dd.onSnapshot((on)=> {
        //         console.log(on.data().message)
        //     })
                        
            console.log("mi current id" + doc) 
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


