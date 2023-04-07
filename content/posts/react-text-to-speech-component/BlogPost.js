import React, { useState, useEffect } from 'react';

import TextToSpeech from './TextToSpeech';

const BlogPost = () => {
  useEffect(() => {
    // Loads Tailwind CSS
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initialText =
    "Text-to-speech feature is now available on relatively any website or blog. It's a game changer that you can listen to the content instead of reading it. Especially effective for people with visual or cognitive impairments or people who are on the go. I came up with the idea to implement it for my blog, so this is how I started doing a research on this topic which ended up being a tutorial for you. So in this tutorial, we will go through the process of building a text-to-speech component in React. We will use the Web Speech API to implement the text-to-speech functionality.";

  const [text, setText] = useState(initialText);

  return (
    <div className="p-8 text-slate-100 bg-slate-900">
      <h1 className="text-2xl font-bold">Text To Speech</h1>
      <TextToSpeech text={text} />
      <textarea
        rows="8"
        class="block text-slate-100 bg-slate-900 p-2.5 w-full text-lg font-normal rounded border"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default BlogPost;
