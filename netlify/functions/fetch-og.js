const https = require('https');
const http  = require('http');
const { URL } = require('url');

function fetchUrl(rawUrl, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 4) return reject(new Error('Too many redirects'));
    let parsed;
    try { parsed = new URL(rawUrl); } catch(e) { return reject(e); }
    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RekBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml'
      },
      timeout: 8000
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, rawUrl).href;
        res.resume();
        return fetchUrl(next, redirects + 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => {
        data += chunk;
        if (data.length > 80000) { res.destroy(); resolve(data); }
      });
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: cors, body: '' };

  const url = event.queryStringParameters && event.queryStringParameters.url;
  if (!url) return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'url required' }) };

  try {
    const html = await fetchUrl(url);
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    ];
    let imageUrl = null;
    for (const pat of patterns) {
      const m = html.match(pat);
      if (m && m[1] && m[1].startsWith('http')) { imageUrl = m[1]; break; }
    }
    return { statusCode: 200, headers: cors, body: JSON.stringify({ imageUrl }) };
  } catch (e) {
    return { statusCode: 200, headers: cors, body: JSON.stringify({ imageUrl: null }) };
  }
};
