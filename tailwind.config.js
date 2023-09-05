const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        '50vw': '50vw',
        '30vw': '33vw',
        '20vw': '20vw',
        '10vw': '10vw',
      },
      height: {
        '50vh': '50vh',
        '30vh': '33vh',
        '20vh': '20vh',
        '10vh': '10vh',
      },
      colors: {
        primary: '#e53935', // Replace with your desired primary color
        secondary: '#e53935',
        blue: {
          500: '#e53935', // Red color code
        },
        yellow:{500:"#fbc02d"}
      },
      animation: {
        'RightToLeft': 'RightToLeft  1s ease-in-out',
        'PulseSlow': 'pulse 6s linear infinite',
        'rotate': 'rotateAndFade 10s ease-in-out infinite',
        'LeftToRight': 'LeftToRight  1s ease-in-out',
        'QuickLeftToRight': 'LeftToRight  0.3s ease-in-out',
        'LogoRotate': 'LogoRotate  10s ease-out infinite',
        'bg': 'animateBg 1s linear infinite',
        "NavSlideUp": 'SlideUp 0.3s ease-in-out',
        "NavSlideDown": 'SlideDown 0.3s ease-in-out',
        "fade": 'fade 0.3s ease-in-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity:'0%' },
          '100%': { opacity:'100%' },
        },
        SlideDown: {
          '0%': { transform: 'translateY(-130%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        SlideUp: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-130%)' },
        },
        RightToLeft: {
          '0%': { transform: 'translateX(+100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        LeftToRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        rotateAndFade: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '50%': {
            transform: 'rotate(5deg)',
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        },

        LogoRotate: {
          '0%': {
            transform: 'rotate(360deg)'
          },
          '10%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        },
        animateBg: {
          '0%': {
            'background-position': '0 0',
          },
          '100%': {
            'background-position': '100% 100%',
          },
        },

      
      }
    },
    screens: {
  sm: "540px",
  md: "720px",
  lg: "960px",
  "lg-max": { max: "960px" },
  xl: "1140px",
  "2xl": "1320px",
    },
  },
  plugins: [],
});


