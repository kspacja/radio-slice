import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'radio-splice',
  eventKey: process.env.INNGEST_API_KEY,
});
