const getRollbarConfig = () => ({
    accessToken: import.meta.env.ACCESS_TOKEN,
    environment: 'production',
});

export default getRollbarConfig;