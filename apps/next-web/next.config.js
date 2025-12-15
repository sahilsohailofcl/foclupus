// C:\Users\sahil\Desktop\Websites\foclupus\apps\next-web\next.config.js

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 1. 🛑 FIX REACT HOOKS: Replace deprecated 'next-transpile-modules' 
  // with the native 'transpilePackages' array. This is critical for monorepos 
  // to unify the React context from local packages.
  transpilePackages: [
    '@foclupus/ui', 
    '@foclupus/utils',
    // Add any other local packages that contain React code:
    '@foclupus/api-client', 
  ],
  
  webpack: (config, { isServer }) => {
    // 2. 🛑 FIX REACT HOOKS: Remove all manual 'react' and 'react-dom' aliases.
    // These aliases interfere with Next.js's internal React version and lead 
    // directly to the "Invalid Hook Call" error.
    
    // We retain the custom CSS/PostCSS rule and the RN shims that you added.
    if (!isServer) {
      // Retain custom CSS/PostCSS configuration:
      config.module.rules.push({
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
        // The include array is kept to target only your necessary global styles.
        include: [
          path.join(__dirname, 'src', 'app', 'globals.css'),
        ],
      });
    }

    // Restore other necessary resolution and alias logic (minus React duplicates)
    config.resolve = config.resolve || {};
    
    // Extensions for React Native Web compatibility (keep this)
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".js",
      "jsx",
      ".ts",
      ".tsx",
    ];
    
    // Aliases for React Native Web compatibility (keep this)
    config.resolve.alias = {
      ...(config.resolve.alias),
      'react-native$': path.resolve(__dirname, 'react-native-shim.js'),
      'react-native': path.resolve(__dirname, 'react-native-shim.js'),
      'lucide-react-native': require.resolve('lucide-react'),
      // REMOVED: 'react', 'react-dom', 'react/jsx-runtime', 'react-dom/client' aliases
    };

    return config;
  },
};

// 3. 🛑 FIX REACT HOOKS: Export only the nextConfig object, removing the withTM wrapper.
module.exports = nextConfig;