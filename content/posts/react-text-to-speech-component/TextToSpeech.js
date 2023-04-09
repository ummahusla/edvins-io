import React, { useState, useEffect } from 'react';

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const isBrowser = typeof window !== 'undefined';

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
    <div
      style={{
        textAlign: 'center',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <label
          style={{
            display: 'block',
            fontWeight: 700,
            margin: '0.5rem',
          }}
        >
          Voice
          <select
            value={voice?.name}
            onChange={handleVoiceChange}
            style={{
              color: 'rgb(15 23 42)',
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              marginTop: '0.25rem',
              borderColor: 'rgb(209 213 219)',
            }}
          >
            <option value="">Select a voice</option>
            {isBrowser &&
              window.speechSynthesis.getVoices().map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
          </select>
        </label>

        <label
          style={{
            display: 'block',
            fontWeight: 700,
            margin: '0.5rem',
          }}
        >
          Pitch
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.10"
            value={pitch}
            onChange={handlePitchChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              marginTop: '0.25rem',
              borderColor: 'rgb(209 213 219)',
            }}
          />
        </label>

        <label
          style={{
            display: 'block',
            fontWeight: 700,
            margin: '0.5rem',
          }}
        >
          Speed
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.10"
            value={rate}
            onChange={handleRateChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              marginTop: '0.25rem',
              borderColor: 'rgb(209 213 219)',
            }}
          />
        </label>

        <label
          style={{
            display: 'block',
            fontWeight: 700,
            margin: '0.5rem',
          }}
        >
          Volume
          <input
            type="range"
            min="0"
            max="1"
            step="0.10"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              marginTop: '0.25rem',
              borderColor: 'rgb(209 213 219)',
            }}
          />
        </label>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '0.5rem',
        }}
      >
        <button
          onClick={handlePlay}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            backgroundColor: 'rgb(59 130 246)',
            borderRadius: '0.25rem',
            color: 'rgb(241, 245, 249)',
            border: '1px solid rgb(59 130 246)',
            cursor: 'pointer',
          }}
        >
          {isPaused ? 'Resume' : 'Play'}
        </button>
        <button
          onClick={handlePause}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            backgroundColor: 'rgb(59 130 246)',
            borderRadius: '0.25rem',
            color: 'rgb(241, 245, 249)',
            border: '1px solid rgb(59 130 246)',
            cursor: 'pointer',
          }}
        >
          Pause
        </button>
        <button
          onClick={handleStop}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            backgroundColor: 'rgb(59 130 246)',
            borderRadius: '0.25rem',
            color: 'rgb(241, 245, 249)',
            border: '1px solid rgb(59 130 246)',
            cursor: 'pointer',
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
