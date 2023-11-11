/*******CHAT*******/

/*******CHAT Variables*******/
let botTextNumber = 0;
let humanTextNumber = 0;

const chatInput = document.querySelector(".container .chatarea textarea")
const chatBtn = document.querySelector(".container .chatarea .btn")


/*******CHAT Listeners*******/
if(chatBtn !== null){
	chatBtn.addEventListener("click", function(e){
		runBotResponse()
	})
}

if(document.querySelector(".chatarea") !== null){
window.addEventListener("load", function(){
	setTimeout(function(){ 

		generateHumanInput()
		humanTextNumber++

	}, 2000)
})
}


/*******CHAT Functions*******/

function generateHumanInput(){

	chatInput.value = prompts[0].human[humanTextNumber]

}

function generateBotResponse(type){

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

			generateHumanInput()
			humanTextNumber++
		}, 2000)
	}
}

function runBotResponse(){
	generateBotResponse("human")

		chatInput.value = ""
		chatInput.placeholder = ""

		const chatDiv = document.querySelector(".chatarea > div:first-child")

		if(botTextNumber > 1){
			
			chatDiv.removeChild(chatDiv.querySelector("div:first-child"))
			chatDiv.removeChild(chatDiv.querySelector("div:nth-child(1)"))
		}


		setTimeout(function(){ 

			generateBotResponse("bot")
			botTextNumber++


			if(botTextNumber > 2){
				document.querySelector(".chatarea .input-area").removeChild(chatInput)
				document.querySelector(".chatarea .input-area").removeChild(chatBtn)
				setTimeout(function(){ 
					showSchedule()
				}, 2000)
			}

		}, 750)
}




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

