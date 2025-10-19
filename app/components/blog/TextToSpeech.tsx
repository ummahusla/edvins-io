'use client';

import React, { useState, useEffect } from 'react';

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!isBrowser) return;

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    const handleVoicesChanged = () => {
      const voices = synth.getVoices();
      setVoice(voices[0]);
    };

    synth.addEventListener('voiceschanged', handleVoicesChanged);

    return () => {
      synth.cancel();
      synth.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, [text, isBrowser]);

  const handlePlay = () => {
    if (!isBrowser || !utterance) return;

    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      if (voice) utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    if (!isBrowser) return;

    const synth = window.speechSynthesis;
    setIsPaused(true);
    synth.pause();
  };

  const handleStop = () => {
    if (!isBrowser) return;

    const synth = window.speechSynthesis;
    setIsPaused(false);
    synth.cancel();
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isBrowser) return;

    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((v) => v.name === event.target.value) || null);
  };

  const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            value={voice?.name || ''}
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
