const messageDisplay = document.querySelector('#messages');
const messageSender = document.querySelector('#messageSender');

function drawChatroom(messageDoc){

    let li = document.createElement('li');
    li.setAttribute('messageID', messageDoc.id);

    let message = document.createElement('span');
    message.textContent = 
    messageDoc.data().messageSender 
    + " says: " +
    messageDoc.data().messageContents;

    li.appendChild(message);
    messageDisplay.appendChild(li);
}

messageSender.addEventListener('submit', (e) => {
    e.preventDefault();
    if(messageSender.nameToSend.value != ''){
        db.collection('chatroom').add({
            messageContents:messageSender.messageToSend.value,
            messageSender:messageSender.nameToSend.value
        });        
        messageSender.messageToSend.value = '';
    }
    else{
        messageSender:messageSender.nameToSend.value = "Forgetting name";
    }
})


db.collection('chatroom').onSnapshot(snapshot => {
    let updates = snapshot.docChanges();
    updates.forEach(message => {
        drawChatroom(message.doc);
    });
})
