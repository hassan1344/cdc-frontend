import { useEffect, useState, useRef } from "react";

const useSpeech = () => {
  const [voices, setVoices] = useState([]);
  const pendingText = useRef(null); 

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);

        if (pendingText.current) {
          speakText(pendingText.current, availableVoices);
          pendingText.current = null;
        }
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakText = (text, voiceList = voices) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const germanVoices = voiceList.filter((voice) =>
      voice.lang.toLowerCase().startsWith("de")
    );

    if (germanVoices.length > 0) {
      utterance.voice = germanVoices[0];
    }

    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const handleReadAloud = (text) => {
    if (voices.length === 0) {
      pendingText.current = text;
    } else {
      speakText(text);
    }
  };

  return handleReadAloud;
};

export default useSpeech;
