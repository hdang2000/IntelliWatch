import type { AnalyzeRequest, StreamEvent, TimeRange } from '@/lib/types';
import { runAnalysis } from '@/lib/pipeline';

export async function POST(request: Request) {
  let body: Partial<AnalyzeRequest>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const competitors = [...new Set((body.competitors ?? []).map((c) => String(c).trim()).filter(Boolean))].slice(0, 5);
  if (!competitors.length) return Response.json({ error: 'Add at least one competitor' }, { status: 400 });
  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: 'GROQ_API_KEY is not set in .env.local' }, { status: 500 });
  }

  const req: AnalyzeRequest = {
    competitors,
    industry: String(body.industry || 'SaaS').slice(0, 60),
    keywords: body.keywords ? String(body.keywords).slice(0, 200) : undefined,
    timeRange: ([7, 30, 90] as TimeRange[]).includes(body.timeRange as TimeRange) ? (body.timeRange as TimeRange) : 30,
  };

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const emit = (e: StreamEvent) => {
        if (!request.signal.aborted) controller.enqueue(encoder.encode(JSON.stringify(e) + '\n'));
      };
      try {
        await runAnalysis(req, emit, request.signal);
      } catch (err) {
        emit({ type: 'error', message: err instanceof Error ? err.message : 'Analysis failed' });
      } finally {
        try {
          controller.close();
        } catch {}
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-cache, no-transform' },
  });
}
