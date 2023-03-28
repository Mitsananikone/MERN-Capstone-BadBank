require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  distDir: '.next', // Add this line to specify the output directory
};

module.exports = {
  ...nextConfig,
  experiments: {
    topLevelAwait: true
  },
  env: {
    MONGODB_URI: 'mongodb+srv://mitsananikone:Medlar75%21@capstonebadbank.nubha1n.mongodb.net/CapstoneBadBank'
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = { mongodb: 'commonjs mongodb' }
      config.resolve.fallback.fs = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.aws4 = false;
      config.resolve.fallback.snappy = false;
      config.resolve.fallback.utils = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.kerberos = false;
      config.resolve.fallback.module = false;
      // Add the following loaders
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader'
      });
      config.module.rules.push({
        test: /\.(jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|cur|ani)$/,
        use: 'url-loader'
      });
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: 'file-loader'
      });
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://capstonedebugdeploy.vercel.app/:path*',
      },
    ]
  },
};
