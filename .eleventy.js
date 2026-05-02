module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./src/css/'); // on build, it copies the files and adds them to output directory
  eleventyConfig.addWatchTarget('./src/css/'); // changes trigger a build

  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/posts');
  eleventyConfig.addPassthroughCopy('./src/js');

  return {
    dir: {
      input: 'src',
      output: 'docs',
    },
  };
};