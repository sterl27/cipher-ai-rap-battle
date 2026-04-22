import { xai } from '@ai-sdk/xai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: xai('grok-beta'), // Using grok-beta or grok-2 as default
    messages,
  });

  return result.toTextStreamResponse();
}
