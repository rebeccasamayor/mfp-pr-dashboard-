exports.handler = async function(event) {
  const url = event.queryStringParameters && event.queryStringParameters.url;
  if (!url) return { statusCode: 400, body: 'Missing url parameter' };

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MFP-PR-Dashboard/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    });
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch(e) {
    return { statusCode: 500, body: e.message };
  }
};
