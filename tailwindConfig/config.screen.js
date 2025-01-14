const screens = {
  //WIDTH_UP_TO - @media(max-width: ${max}px)
  "max-sm": { max: '500px' },
  "max-md": { max: '720px' },
  "max-lg": { max: '960px' },
  "max-xl": { max: '1280px' },

  //WIDTH_FROM - @media(min-width: ${min-}px)
  'min-sm': '501px',
  'min-md': '721px',
  'min-lg': '961px',
  'min-xl': '1281px',
  'min-2xl': '2561px',
  'sm-lg': { min: '501px', max: '768px' },
  'md-xl': { min: '769px' }
}

module.exports = { screens }
