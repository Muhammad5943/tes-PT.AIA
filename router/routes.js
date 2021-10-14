const AuthenticationController = require('../controllers/AuthenticationControllers')

/* Middleware */
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
    /* Authentication */
    app.post('/signup',
        AuthenticationController.register
    )
    app.post('/login',
        AuthenticationController.login
    )

    /* Test if Authenticated */
    app.get('/test',
        isAuthenticated,
        AuthenticationController.test
    )

    /* Logout */
    // app.get('/flickr',
    //     // isAuthenticated,
    //     AuthenticationController.flickr
    // )
}