module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [ 'src/**/*.js', '!**/node_modules/**' ],
    coverageReporters: [
        'cobertura',
        'html',
        'text',
        'text-summary',
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    }
};
