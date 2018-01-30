module.exports = {
    rootUrl: 'http://localhost:4200',
    gridUrl: 'http://127.0.0.1:4444/wd/hub'
    system: {
            plugins: {
                'html-reporter': {
                    enabled: true,
                    path: 'gemini-reports',
                    defaultView: 'all'
                }
            }
        },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};
