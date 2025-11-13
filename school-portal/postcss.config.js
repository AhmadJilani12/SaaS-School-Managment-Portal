module.exports = {
  // Use explicit require() calls so Next/Vercel resolves plugins reliably
  // when loading PostCSS plugins during the build.
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
  ],
}