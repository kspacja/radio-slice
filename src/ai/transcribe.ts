'use server';

import { openai } from '.';

export default async function transcribeAudioAndSaveToFile(fileUrl: string) {
  const file = await fetch(fileUrl);

  const text = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    response_format: 'srt',
    prompt: 'To jest audycja radiowa, mogą padać nazwy piosenek i autorów',
  });

  console.log('Transcription completed');

  // console.log('Saving transcription to file...');
  // writeFileSync(`./transcripts/transcript-${fileName}.txt`, text);

  return text;
}
