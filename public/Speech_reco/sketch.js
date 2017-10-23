var speechRec = new p5.SpeechRec(); 

function setup()
{
	createCanvas(400, 200);
	background(0, 255, 0);
	fill(0, 0, 0, 255);
	textSize(32);
	text("say something", width/2, height/2);
	
	//let voice = new p5.Speech();
	//voice.setVoice('Cellos')
	//voice.speak("Salut tout le monde");
	
	//let lang = 'en-US'//navigator.language || 'fr-FR';
	speechRec.onResult = gotSpeech;
	
	//let continuous = true;
	//let interim = true;
	speechRec.start();//continuous, interim);
	//speechRec.onEnd(background(0, 0, 0);)
}

function gotSpeech()
{
	if (speechRec.resultValue)
	{
		text(speechRec.resultString, width/2, height/2);
		console.log(speechRec.resultString);
	}
}
