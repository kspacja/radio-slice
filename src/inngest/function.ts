import { clientDB } from '@/db';
import { inngest } from './';
// import {transcribeAudioAndSaveToFile} from '@/ai/transcribe';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');

    await clientDB
      .from('transcriptions')
      .update({
        status: 'completed',
      })
      .eq('id', event.data.transcriptionID);

    return {
      message: `You have created transcription: ${event.data.transcriptionID} | Audio URL: ${event.data.url}!`,
    };
  }
);

// export const transcribeAudioAI = inngest.createFunction(
//   { id: 'transcribe-audio-ai' },
//   { event: 'ai/transcribe.audio' },
//   async ({ event }) => {

//     const await transcribeAudioAndSaveToFile(event.data.fileUrl)
//   }
// )
