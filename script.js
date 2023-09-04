document.querySelector("form").addEventListener("submit", handleClick);
document.querySelector("#name").addEventListener("change", handleGreeting)
const nameInput = document.querySelector("#name");
const submitBtn = document.querySelector(".submit");
const forceBtn = document.querySelector("#force");
let messagesArray = []


function handleClick(event) {
const now = new Date();
    console.log("click");
    event.preventDefault();
    const messageCont = document.querySelector(".messages");
    const messagesWrapper = document.createElement("div");
    messagesWrapper.classList.add("message-wrapper");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", deleteButton);
    const messageElement = document.createElement("p");
    messageElement.classList.add("inserted-message");
    messageElement.title = formatDate();
    messageElement.innerHTML = document.querySelector("#message").value;
    let messageText = document.querySelector("#message").value;
    if(messageElement.innerHTML === "") {
        alert("Please enter a message");
        return;
    }
    if (messageText !== "") {
        messagesArray.push(messageText);
    
    }

    console.log("Messages array:", messagesArray);
    console.log(messageElement);
    //add to dom 
    messagesWrapper.appendChild(messageElement);
    messageElement.appendChild(deleteBtn);
    messageCont.appendChild(messagesWrapper);
    const currrentDiv = document.querySelector(".messages");
    console.log(currrentDiv, "current div")

    //call date fomrat 
    console.log(now, "now");
    formatDate(now);
 
}


function deleteButton() {
        console.log("delete message")
    const messageCont = document.querySelector(".messages");
        const deleteBtn = document.querySelector(".delete-btn");
        const messageWrapper = document.querySelector(".message-wrapper");
        const messageElement = document.querySelector(".inserted-message");
        //remove the messagewrapper from the dom
        messageCont.removeChild(messageCont.lastChild);;
}

function handleGreeting() {
    
console.log("handle greeting")
const myName = nameInput.value
const p = document.createElement("p");
document.querySelector(".greeting-cont").appendChild(p);
p.classList.add("greeting-message");

p.innerText = `Hello ${myName}! How are you today?`;

if (myName) {
    if (myName === "") {
        p.innerText = "Hello! How are you today?";
    }
} 

}

function formatDate(date) {
    const now = new Date();

    const toReturn = now.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

    })
  
    return toReturn
  }
/* 
  function displayDate(formattedDate) {
    console.log("display date", formattedDate)
    time.innerText = formattedDate;
   
  } */
  

async function forceMessage() {
    console.log("force message")
    
    //TODO: get the joke
    fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit")
    
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit", {
        method: "GET",
    })
    const data = await res.json();
    console.log(data, "data")


    //TODO Create a new p element
    const joke = document.createElement("p");
     joke.innerHTML = data.setup + " " + data.delivery;
     joke.classList.add("joke-message");

                 // Find the existing joke element by its class
                 let jokeElement = document.querySelector(".joke-message");

                 // Create a new p element if it doesn't exist
                 if (!jokeElement) {
                     let joke = document.createElement("p");
                     joke.classList.add("joke-message");
                     jokeElement = joke;
                 }
     
                     // Display the joke if it's available
             if (data.type === "twopart") {
                 jokeElement.textContent = data.setup + " " + data.delivery;
             } else {
                 jokeElement.textContent = data.joke;
             }
         

//TODO pish the new p elemtn to the DOM
if (jokeElement) {
    document.querySelector(".greeting").appendChild(jokeElement);
}


}
forceBtn.addEventListener("click", forceMessage);