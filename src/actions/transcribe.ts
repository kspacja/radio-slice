'use server';

import { clientDB } from '@/db';
import { inngest } from '@/inngest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function transcribe(url: string) {
  const response = await clientDB.from('transcriptions').upsert({}).select();

  console.log(response);

  const transcription = response?.data?.at(0);

  if (!transcription) {
    throw new Error('Failed to create transcription record');
  }

  inngest.send({
    name: 'test/hello.world',
    data: {
      transcriptionID: transcription?.id,
      url,
    },
  });

  return null;
}
