export const BACKEND_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://jhmyrcpav9.execute-api.us-east-1.amazonaws.com/dev';

export const proxyJsonPost = async (path: string, body: unknown) => {
  const response = await fetch(`${BACKEND_API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const text = await response.text();
  const contentType = response.headers.get('content-type') || 'application/json';

  return new Response(text, {
    status: response.status,
    headers: {
      'Content-Type': contentType,
    },
  });
};
