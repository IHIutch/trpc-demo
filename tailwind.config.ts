import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
