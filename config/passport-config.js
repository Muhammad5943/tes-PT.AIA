module.exports = {
    authentication: {
        // eslint-disable-next-line no-undef
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}