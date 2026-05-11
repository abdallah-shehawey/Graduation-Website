import { google } from 'googleapis';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing file id' });
  }

  try {
    const credentialsJson = Buffer.from(
      process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
      'base64'
    ).toString('utf-8');
    const credentials = JSON.parse(credentialsJson);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Stream the file content directly from Drive
    const fileRes = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );

    // Cache for 24 hours in browser & CDN
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('Content-Type', fileRes.headers['content-type'] || 'image/jpeg');

    fileRes.data.pipe(res);
  } catch (error) {
    console.error('Image proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
