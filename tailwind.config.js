// tailwind.config.js
module.exports = {
  content: [
    "./app.vue",
    "./formkit.theme.ts" // <-- add your theme file,
    

  ],
    purge: [],
    darkMode: true, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@formkit/tailwindcss')
    ],
  }