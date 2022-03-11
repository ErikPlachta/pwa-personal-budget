//-- Create association 
module.exports = {
    //-- Where client-code is stored
    entry: {
      app: './assets/js/script.js',
      events: './assets/js/events.js',
      schedule: './assets/js/schedule.js',
      tickets: './assets/js/tickets.js'
    }, 
    //-- Where data is being output
    output: {
      filename: "[name].bundle.js", // for each entry, make a file bundle
      // path: path.resolve(__dirname, 'dist'),
      path: __dirname +'/dist',
    },
    module: {
      rules: [
        {
          test: /\.jpg$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                esModule: false,
                name (file) {
                  return "[path][name].[ext]"
                },
                publicPath: function(url) {
                  return url.replace("../", "/assets/")
                }
              }  
            },
            {
              loader: 'image-webpack-loader'
            }
          ]
          
        },
      ]
    },    
    //-- Onboarding Jquery to address dependency issues
    plugins:[
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // the report outputs to an HTML file in the dist folder
      }),
      new WebpackPwaManifest({
        name: "Personal Budget PWA",
        short_name: "Personal-Budget",
        description: "demonstrate how using a PWA and Service Workers can be used in-hand with a Node/Express.js server to build a seamless user experience where performance is not affected by the users network connection.",
        start_url: "./public/index.html", //specify the homepage for the PWA relative to the location of the manifest file.
        background_color: "#01579b",
        theme_color: "#ffffff",
        fingerprints: false,
        inject: false,
        //TODO:: 03/11/22 #EP | Add icons
        // icons: [{
        //   src: path.resolve("assets/img/icons/icon-512x512.png"),
        //   sizes: [96, 128, 192, 256, 384, 512],
        //   destination: path.join("assets", "icons")
        // }]
      })
      
    ],  
    watchOptions: {
      aggregateTimeout: 6000,
      ignored: /node_modules/,

    },
    mode: 'development'
};

