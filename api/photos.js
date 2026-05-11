import { google } from 'googleapis';

let cachedPhotos = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  try {
    if (cachedPhotos && Date.now() - cacheTime < CACHE_TTL) {
      return res.status(200).json({ success: true, photos: cachedPhotos });
    }

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

    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name)',
      pageSize: 500,
    });

    // Build map: { "abdallah": "/api/image?id=FILE_ID" }
    // Using our own proxy endpoint so the browser doesn't need Drive auth
    const photos = {};
    for (const file of response.data.files) {
      const key = file.name.replace(/\.[^/.]+$/, '').toLowerCase().trim();
      photos[key] = `/api/image?id=${file.id}`;
    }

    cachedPhotos = photos;
    cacheTime = Date.now();

    res.status(200).json({ success: true, photos });
  } catch (error) {
    console.error('Drive API Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}
