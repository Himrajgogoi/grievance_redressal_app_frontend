const withPWA = require("next-pwa")({
  dest: "public",
  // put other next-pwa options here
});

const nextConfig = withPWA({
  reactStrictMode: true,
  env: {
    RECAPTCHA_SITE_KEY : process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY, 
  }
  // put other next js options here
});

module.exports = nextConfig;