import { process } from '/env'
import {OpenAI} from 'openai'

//*******CHAT*******/

//*******CHAT Variables*******/
let steps = []
let stepKeys = []
let stepNumber = 0


const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
}

let chatInput = document.querySelector(".container-fluid.chat .chatarea textarea")
const chatBtn = document.querySelector(".container-fluid.chat .chatarea .btn")
let setupInputContainer = document.querySelector('.container-fluid.chat .chatarea .input-area') !== null
	?document.querySelector('.container-fluid.chat .chatarea .input-area')
	:null
let setupTextInitialHTML = setupInputContainer !== null ? setupInputContainer.innerHTML: "";


const responseBubble = document.createElement("div");
responseBubble.setAttribute("class","chat-bubble human");

const botBubble = document.createElement("div");
botBubble.setAttribute("class","chat-bubble bot");

if(document.querySelector(".chatarea > div:first-child") !== null){
	document.querySelector(".chatarea > div:first-child").appendChild(responseBubble);
	responseBubble.style.display = "none";


	document.querySelector(".chatarea > div:first-child").appendChild(botBubble);
	botBubble.style.display = "none";
	botBubble.innerText = "Tell me a bit about what you’re overwhelmed with today."

	if(document.querySelector(".chatarea") !== null){
	window.addEventListener("load", function(){
		setTimeout(function(){ 

			botBubble.style.display = "block";

		}, 2000)
	})
	}

}

//*******CHAT Listeners*******/
if(chatBtn !== null){
	chatBtn.addEventListener("click", function(e){
		sendButton()
	})
}



//*******CHAT Functions*******/

 async function fetchBotReply(setupText){

    const client = new OpenAI(configuration)

    const response = await client.chat.completions.create({
      model:"gpt-3.5-turbo-1106",
      response_format:{ "type": "json_object" },
      messages:[
        {"role": "system", "content": "You are a helpful assistant designed to output JSON in step-by-step instructions."},
        {"role": "user", "content": setupText}
      ]
      
    })
    
    
    const keys = Object.keys(JSON.parse(response.choices[0].message.content))
 

    if(stepNumber === 0){
        stepKeys = Object.keys(JSON.parse(response.choices[0].message.content))
        steps = JSON.parse(response.choices[0].message.content)
    }
    
    if(stepNumber === stepKeys.length)
    	showSchedule()

    botBubble.innerText = `Step ${(stepNumber + 1)}: ${steps[stepKeys[stepNumber]]}`

    if(stepNumber > 0 && stepNumber < stepKeys.length){
 
        responseBubble.style.display = "block";
        responseBubble.innerHTML = `<h1>${(stepNumber)}:${setupText}</h1>`
        console.log(response.choices[0].message.content)
        for(let i = 0; i < keys.length;i++){
            const keyValue = JSON.parse(response.choices[0].message.content)[keys[i]]
            //console.log(typeof keyValue)
            if(typeof keyValue === "string")
                responseBubble.innerHTML += `${keyValue} \n`
            else if( typeof keyValue === "object" ){
                const subKeys = keyValue
                console.log(subKeys)
                responseBubble.innerHTML += `${keys[i]}: ${subKeys.join(",")} \n`
                
            }
        }
        
    }
    
    setupInputContainer.innerHTML = setupTextInitialHTML

	document.querySelector(".container-fluid.chat .chatarea .btn").addEventListener("click", function(e){
		sendButton()
	})
	chatInput = document.querySelector(".container-fluid.chat .chatarea textarea")
	chatInput.placeholder = "What can I help you with next?"
    
    stepNumber++
}

function sendButton(){
    chatInput = document.querySelector(".container-fluid.chat .chatarea textarea")
    if (chatInput.value) {
        chatInput.innerText = ""
        chatInput.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
        botBubble.innerText = `Ok, just wait a second while I find a solution...`
        fetchBotReply(chatInput.value);

    }
}

/*function generateBotResponse(type){

	const botBubble = document.createElement("div");
	botBubble.setAttribute("class","chat-bubble " + type);
	if(botTextNumber > 1 && type === "bot"){
		botBubble.setAttribute("class","chat-bubble calculating");
	}
	const bubbleName = "<span class=\"bold\">" + (type === 'human'? 'You' : 'Dakota') + ":</span>" 
	const bubbleText = type === "human" ? chatInput.value : prompts[0].bot[botTextNumber];
	botBubble.innerHTML = bubbleText;

	document.querySelector(".chatarea > div:first-child").appendChild(botBubble);
	if(humanTextNumber < 3 && type === "bot"){
		setTimeout(function(){ 

		// CHAT
	generateHumanInput()
			humanTextNumber++
		}, 2000)
	}
}*/






const continueBtn = document.getElementById('continue') !== null 
		? document.getElementById('continue')
		: null

const startBtn = document.getElementById('start')

function startChat() {
    window.location.href = `./chat.html`;
}

function showSchedule() {
    window.location.href = `./schedule.html`;
}

function startProject() {
    window.location.href = `./day.html`;
}


if(continueBtn !== null)
	continueBtn.addEventListener('click', startChat)

if(startBtn !== null)
	startBtn.addEventListener('click', startProject)

