'use client';

import React, { useState } from 'react';
import TextToSpeech from './TextToSpeech';

const BlogPost = () => {
  const initialText =
    "Text-to-speech feature is now available on relatively any website or blog. It's a game changer that you can listen to the content instead of reading it. Especially effective for people with visual or cognitive impairments or people who are on the go. I came up with the idea to implement it for my blog, so this is how I started doing a research on this topic which ended up being a tutorial for you. So in this tutorial, we will go through the process of building a text-to-speech component in React. We will use the Web Speech API to implement the text-to-speech functionality.";

  const [text, setText] = useState(initialText);

  return (
    <div
      style={{
        color: 'rgb(241 245 249)',
        padding: '2rem',
        backgroundColor: 'rgb(15 23 42)',
      }}
    >
      <h1
        style={{
          fontWeight: 700,
          fontSize: '1.5rem',
          lineHeight: '2rem',
        }}
      >
        Text To Speech
      </h1>
      <TextToSpeech text={text} />
      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          color: 'rgb(241 245 249)',
          backgroundColor: 'rgb(15 23 42)',
          display: 'block',
          fontWeight: 400,
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          padding: '0.625rem',
          borderWidth: '1px',
          borderRadius: '0.25rem',
          width: '100%',
        }}
      ></textarea>
    </div>
  );
};

export default BlogPost;
