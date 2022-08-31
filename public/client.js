const socket = io()

let name;
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector(".message__area")

do {
    name = prompt('Please Enter Your Name')
} while (!name);

textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){

    let msg = {
        user: name,
        message: message.trim()
    }

    appendMessage(msg,'outgoing')    //Call Fuction For Append Message In Chat Box
    textarea.value = ''
    scrollToBottom()

    socket.emit('message', msg)      //Send To Server
}

function appendMessage(msg, type)
{
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'Message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//Recieve Message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom()
{
    messageArea.scrollTop = messageArea.scrollHeight
}


