export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const targetUrl = url.searchParams.get("url");

      if (!targetUrl) {
        return new Response("Missing target URL", {
          status: 400,
          headers: corsHeaders,
        });
      }

      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
      });

      return new Response(response.body, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          ...corsHeaders,
        },
      });
    } catch (error) {
      return new Response("Proxy Error: " + error.message, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
