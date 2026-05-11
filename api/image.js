import { google } from 'googleapis';

// Cache auth client at module level — reused across warm invocations
let cachedDrive = null;

async function getDrive() {
  if (cachedDrive) return cachedDrive;

  const credentialsJson = Buffer.from(
    process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
    'base64'
  ).toString('utf-8');
  const credentials = JSON.parse(credentialsJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  cachedDrive = google.drive({ version: 'v3', auth });
  return cachedDrive;
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing file id' });
  }

  try {
    const drive = await getDrive();

    const fileRes = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );

    // Cache 7 days in browser + Vercel CDN edge
    res.setHeader('Cache-Control', 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400');
    res.setHeader('Content-Type', fileRes.headers['content-type'] || 'image/jpeg');

    fileRes.data.pipe(res);
  } catch (error) {
    console.error('Image proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
