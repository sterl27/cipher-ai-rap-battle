import { ElevenLabsClient } from 'elevenlabs';

export async function POST(req: Request) {
  try {
    const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
    const { text } = await req.json();
    
    // Generate audio using ElevenLabs
    const audioStream = await elevenlabs.textToSpeech.convertAsStream(
      "21m00Tcm4TlvDq8ikWAM", // Default Rachel voice ID
      {
        text,
        model_id: "eleven_multilingual_v2",
      }
    );

    return new Response(audioStream as unknown as BodyInit, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Audio Generation Error:', error);
    return new Response('Error generating audio', { status: 500 });
  }
}
