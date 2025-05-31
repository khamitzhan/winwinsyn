/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        'background-light': '#1A1A1A',
        primary: '#FFD700',
        'primary-light': '#FFDF40',
        'primary-dark': '#D4AF37',
        secondary: '#7C0A02',
        'secondary-light': '#9C0A02',
        'secondary-dark': '#5C0802',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.3)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
        'gradient-bordeaux': 'linear-gradient(135deg, #7C0A02 0%, #5C0802 100%)',
      },
    },
  },
  plugins: [],
};