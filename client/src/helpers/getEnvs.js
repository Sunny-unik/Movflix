export default () => {
  // eslint-disable-next-line no-undef
  const serverUrl = process.env.LIVE_SERVER_URL || "http://localhost:4000";
  return { serverUrl };
};
