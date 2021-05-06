const configs = {
    APP_ENV: process.env.REACT_APP_ENV || 'production',

    /** test */ 
    API_DOMAIN: process.env.REACT_APP_API_DOMAIN || 'http://localhost:8080/api',
    /** production */
    // API_DOMAIN: process.env.REACT_APP_API_DOMAIN || '',
};

export default configs;