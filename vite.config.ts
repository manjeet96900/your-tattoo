import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function setupApiMiddlewares(middlewares: any) {
  // 1. Health & Status endpoint
  middlewares.use('/api/site-data-status', (req: any, res: any) => {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          status: 'online',
          persistence: 'filesystem-codebase',
          siteDataFile: 'src/data/siteData.ts',
          uploadsDirectory: 'public/uploads',
        })
      );
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  // 2. Upload Image File to /public/uploads/
  middlewares.use('/api/upload-image', (req: any, res: any) => {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const { dataUrl, fileName, slotId } = JSON.parse(body);
          if (!dataUrl) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing dataUrl' }));
            return;
          }

          const uploadsDir = path.resolve(__dirname, 'public', 'uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }

          const match = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
          if (!match) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid data URL format' }));
            return;
          }

          const mimeType = match[1];
          const base64Data = match[2];
          let ext = mimeType.split('/')[1] || 'jpg';
          if (ext === 'jpeg') ext = 'jpg';

          const cleanBaseName = (slotId || fileName || 'img')
            .replace(/\.[^/.]+$/, '')
            .replace(/[^a-zA-Z0-9_-]/g, '_');
          const finalFileName = `${cleanBaseName}.${ext}`;
          const filePath = path.join(uploadsDir, finalFileName);

          // Remove any existing file for this slot with a different extension
          try {
            const existingFiles = fs.readdirSync(uploadsDir);
            for (const f of existingFiles) {
              if (f.startsWith(`${cleanBaseName}.`) && f !== finalFileName) {
                fs.unlinkSync(path.join(uploadsDir, f));
              }
            }
          } catch (_) {}

          fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, url: `/uploads/${finalFileName}?t=${Date.now()}` }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

  // 3. Save SiteData directly to src/data/siteData.ts on disk
  middlewares.use('/api/save-site-data', (req: any, res: any) => {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const { updatedSiteData } = JSON.parse(body);
          if (!updatedSiteData) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing updatedSiteData' }));
            return;
          }

          const siteDataPath = path.resolve(__dirname, 'src', 'data', 'siteData.ts');

          let jsonStr = JSON.stringify(updatedSiteData, null, 2);
          // Preserve web3Forms accessKey expression
          jsonStr = jsonStr.replace(
            /"accessKey": ".*?"/,
            `accessKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY) || 'YOUR_WEB3FORMS_ACCESS_KEY_HERE'`
          );

          const newFileContent = `import { SiteData } from '../types';

/**
 * ============================================================================
 * YOUR STORY TATTOO — CENTRAL DATA ARCHITECTURE
 * ============================================================================
 * This file is the single editable source of truth for all business content,
 * artists, services, gallery images, copy, and contact parameters.
 *
 * All image paths support desktop and mobile positioning overrides.
 * Replace placeholder image URLs with your studio's photography when ready.
 * ============================================================================
 */

export const siteData: SiteData = ${jsonStr};
`;

          fs.writeFileSync(siteDataPath, newFileContent, 'utf-8');

          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              success: true,
              message: 'Successfully updated src/data/siteData.ts on disk',
              timestamp: new Date().toISOString(),
            })
          );
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
}

function imageUploadPlugin(): Plugin {
  return {
    name: 'image-upload-and-site-data-plugin',
    configureServer(server) {
      setupApiMiddlewares(server.middlewares);
    },
    configurePreviewServer(server) {
      setupApiMiddlewares(server.middlewares);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), imageUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
