function setup()
{
	noCanvas();
	let lang = navigator.language || 'fr-FR';
	let speechRec = new p5.SpeechRec(lang, gotSpeech);

	speechRec.start();

	function gotSpeech()
	{
		if (speechRec.resultValue)
		{
			createP(speechRec.resultString);
		}
		console.log(speechRec);
	}
}