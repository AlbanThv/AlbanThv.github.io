function setup()
{
	noCanvas();
	
	let voice = new p5.Speech();
	voice.setVoice('Cellos')
	voice.speak("Salut tout le monde");
	
	let lang = 'en-US'//navigator.language || 'fr-FR';
	let speechRec = new p5.SpeechRec(lang, gotSpeech);
	
	let continuous = true;
	let interim = true;
	speechRec.start(continuous, interim);
}

function gotSpeech()
{
	if (speechRec.resultValue)
	{
		createP(speechRec.resultString);
		console.log(speechRec.resultString);
	}
}
