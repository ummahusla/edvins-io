import React, { useState, useEffect } from 'react';

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
    synth.addEventListener('voiceschanged', () => {
      const voices = synth.getVoices();
      setVoice(voices[0]);
    });

    return () => {
      synth.cancel();
      synth.removeEventListener('voiceschanged', () => {
        setVoice(null);
      });
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    setIsPaused(true);
    synth.pause();
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    setIsPaused(false);
    synth.cancel();
  };

  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value));
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="text-center px-8 mb-4">
      <div className="flex justify-between">
        <label className="block m-2 font-bold">
          Voice
          <select
            className="block w-full p-2 text-slate-900 mt-1 rounded border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            value={voice?.name}
            onChange={handleVoiceChange}
          >
            <option value="">Select a voice</option>
            {window.speechSynthesis.getVoices().map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block m-2 font-bold">
          Pitch
          <input
            className="block w-full p-2 mt-1 rounded border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            type="range"
            min="0.5"
            max="2"
            step="0.10"
            value={pitch}
            onChange={handlePitchChange}
          />
        </label>

        <label className="block m-2 font-bold">
          Speed
          <input
            className="block w-full p-2 mt-1 rounded border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            type="range"
            min="0.5"
            max="2"
            step="0.10"
            value={rate}
            onChange={handleRateChange}
          />
        </label>

        <label className="block m-2 font-bold">
          Volume
          <input
            className="block w-full p-2 mt-1 rounded border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            type="range"
            min="0"
            max="1"
            step="0.10"
            value={volume}
            onChange={handleVolumeChange}
          />
        </label>
      </div>

      <div className="flex justify-center mt-2">
        <button
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handlePlay}
        >
          {isPaused ? 'Resume' : 'Play'}
        </button>
        <button
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handlePause}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
