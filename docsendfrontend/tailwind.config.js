module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Add support for TypeScript if needed
  theme: {
    extend: {
      height: {
        '128': '32rem', // 512px
        '132': '33rem', // 528px
        '135': '38rem', // 576px
      },
      maxWidth: {
        '9xl': '144rem', // 2304px
        '10xl': '160rem', // 2560px
      },
      colors: {
        'dark-blue': '#003049',
        'pale-yellow': '#fefae0',
      },
    },
  },
  plugins: [],
}
