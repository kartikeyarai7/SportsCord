const socket = io();

let firstName;
let textarea = document.querySelector('#textarea'); 
let messagearea = document.querySelector('.message__area'); 
do {
    firstName =  prompt('Enter your name: ')
    console.log(firstName);
} while(!firstName)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(msg){
    let textmsg = {
        user : firstName,
        message: msg
    }

    appendMessage(textmsg,'outgoing')
    textarea.value = '';
    scrollToBottom();

    socket.emit('message',textmsg)  
}


function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);

}

socket.on('message',(msg)=>{
    console.log(msg);
    appendMessage(msg,'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}
