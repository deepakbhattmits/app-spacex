module.exports = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "fr", "ar"],
    defaultLocale: "en",
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });
    return config;
  },
};
