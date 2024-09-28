// tailwind.config = {
//     theme: {
//         extend: {
//             colors: {
//                 iceCold: '#a0d2eb',
//                 freezePurple: '#e5eaf5',
//                 mediumPurple: '#d0bdf4',
//                 purplePain: '#8458B3',
//                 heavyPurple: '#494D60',
//             }
//         }
//     }
// }
module.exports = {
    content: [
      './postcss.config.js', // Adjust paths based on your project structure
      './src/main.jsx',
      './src/App.jsx',
      './index.html',
    ],
    theme: {
      extend: {
        colors: {
          iceCold: '#a0d2eb',
          freezePurple: '#e5eaf5',
          mediumPurple: '#d0bdf4',
          purplePain: '#8458B3',
          heavyPurple: '#494D60',
        },
      },
    },
    plugins: [],
};
  