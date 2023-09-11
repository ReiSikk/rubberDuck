document.querySelector("form").addEventListener("submit", handleClick);
document.querySelector("#name").addEventListener("change", handleGreeting)
const nameInput = document.querySelector("#name");
const submitBtn = document.querySelector(".submit");
const forceBtn = document.querySelector("#force");
const sendForm = document.querySelector("#send-form");
const inputValue = document.querySelector("#message").value;
const messageCont = document.querySelector(".messages");
const now = new Date();

let messagesArray = []




 async function handleClick(event) {
    event.preventDefault();

            // send to firebase backend 
            const timestamp = formatDate();

            const obj = {
                message: message.value,
                timestamp
            };
        
            const response = await saveToFirebase(obj);
        
            if(response.status > 499) {
                alert("Something went wrong. Server not working");
              } else if ( response.status > 399) {
                alert("Something went wrong. Please try again.");
              } else {
                const body = await response.json();
                console.log(body, "body");
              }


    const messagesWrapper = document.createElement("div");
    messagesWrapper.classList.add("message-wrapper");
    //create delete button and append to created div
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", deleteButton);

    //create p element and append to created div
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



    //add to dom 
    messagesWrapper.appendChild(messageElement);
    messageElement.appendChild(deleteBtn);
    messageCont.appendChild(messagesWrapper);
    const currrentDiv = document.querySelector(".messages");
    //call date fomrat 
    formatDate(now);
    console.log(now, "now");
 
}
async function saveToFirebase(message) {
    const response = await fetch(
      "https://web-1st-semester-default-rtdb.europe-west1.firebasedatabase.app/mr-duck/cph-rs245.json",
      {
        method: "POST",
        body: JSON.stringify(message),
      }
    );
    console.log(response);
    return response;
  }

  async function getFromFirebase() {
    const response = await fetch(
        "https://web-1st-semester-default-rtdb.europe-west1.firebasedatabase.app/mr-duck/cph-rs245.json"
        );

        const body = await response.json();
        console.log(body, "body");
        const toArray = Object.values(body);
        console.log(toArray, "messages");
        return toArray;
    }

  sendForm.addEventListener("submit", handleClick);

  function toHtmlElements(inputs) {
  //TODO: Transform array of objects to and array of HTML elements
    inputs.map((input) => {
        const p = document.createElement("p");
        p.innerText = input.inputValue;
        p.title = input.timestamp;

    })
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

function formatDate() {
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

window.addEventListener("load", async () => {
    const array = await getFromFirebase();
    const elements = toHtmlElements(array);
    console.log(elements, "elements");
    elements.forEach((element) => {
        messageCont.appendChild(element);
    }
    )
})