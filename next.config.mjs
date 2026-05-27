/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cursor / VS Code Simple Browser embeds the app in a webview; allow framing in dev.
  async headers() {
    if (process.env.NODE_ENV !== 'development') {
      return [];
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' http://127.0.0.1:* http://localhost:* https://*.cursor.sh https://*.cursor.com vscode-webview:",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
