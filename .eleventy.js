module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./src/css/'); // on build, it copies the files and adds them to output directory
  eleventyConfig.addWatchTarget('./src/css/'); // changes trigger a build

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