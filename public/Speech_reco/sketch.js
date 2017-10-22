let lang = 'fr-FR'//navigator.language || 'fr-FR';
var speechRec = new p5.SpeechRec(lang, gotSpeech);

function setup()
{
	noCanvas();
	
	let voice = new p5.Speech();
	voice.speak("Hello everyone");
	
	let lang = 'en-US'//navigator.language || 'fr-FR';
	let speechRec = new p5.SpeechRec(lang, gotSpeech);
	
	let continuous = true;
	let interim = true;
	speechRec.start(continuous, interim);

	function gotSpeech()
	{
		if (speechRec.resultValue)
		{
			createP(speechRec.resultString);
			console.log(speechRec.resultString);
		}
	}
}
