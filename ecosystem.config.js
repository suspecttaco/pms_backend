module.exports = {
    apps: [{
        name: 'pms-backend',
        script: './dist/src/main.js',
        instances: 'max',
        exec_mode: 'cluster',
        env_production: {
            NODE_ENV: 'production',
            PORT: 8080
        }
    }]
};
