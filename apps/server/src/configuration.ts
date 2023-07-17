export default () => ({
  PORT: parseInt(process.env.PORT || 'NaN') || 4000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});
