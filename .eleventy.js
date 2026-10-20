module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./src/alex/css/');
  eleventyConfig.addWatchTarget('./src/alex/css/');
  eleventyConfig.addPassthroughCopy('./src/alex/images/');
  eleventyConfig.addWatchTarget('./src/alex/images/');
  eleventyConfig.addPassthroughCopy('./src/index.css');
  eleventyConfig.addWatchTarget('./src/index.css');

  // Personal
  eleventyConfig.addPassthroughCopy('./src/personal/images');
  eleventyConfig.addPassthroughCopy('./src/personal/articles');
  eleventyConfig.addPassthroughCopy('./src/personal/fonts');
  eleventyConfig.addPassthroughCopy('./src/personal/js');
  
  // Dictionaries
  eleventyConfig.addPassthroughCopy("src/dictionaries");

  return {
    dir: {
      input: 'src',
      output: 'docs',
    },
  };
};