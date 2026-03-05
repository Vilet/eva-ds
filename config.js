import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  filter: (token) => token.$type === 'dimension',
  transform: (token) => {
    const val = parseFloat(token.$value ?? token.value);
    return isNaN(val) ? (token.$value ?? token.value) : `${val}px`;
  },
});

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      // Same as the built-in 'css' transformGroup but with size/px instead of size/rem
      transforms: [
        'attribute/cti',
        'name/kebab',
        'time/seconds',
        'html/icon',
        'size/px',
        'color/css',
        'asset/url',
        'fontFamily/css',
        'cubicBezier/css',
        'strokeStyle/css/shorthand',
        'border/css/shorthand',
        'typography/css/shorthand',
        'transition/css/shorthand',
        'shadow/css/shorthand',
      ],
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: true,
          },
        },
      ],
    },
  },
};
