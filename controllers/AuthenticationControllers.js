const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passportConfig = require('../config/passport-config')
const axios = require('axios')
const xml2json = require('xml2json')
const flickr = require('flickr-sdk');

function jwtSignUser (user) {
    const ONE_HOUR = 60 * 60 * 24
    return jwt.sign(user, passportConfig.authentication.jwtSecret, {
        expiresIn: ONE_HOUR
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)

            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'This account is already in use.'
            })
        }
    },

    async login (req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({
                where: {
                    username: username
                }
            })

            if(!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            // console.log(password, user.password);
            // console.log(isPasswordValid);
            if(!isMatch) {
                return res.status(403).send({
                    error: 'The password was incorrect'
                })
            }

            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })

        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to login.'
            })
        }
    },

    async test (req, res) {
        try {
            // console.log(req.user.id)
            const user = await User.findOne({
                where: {
                    id: req.user.id
                }
            })

            // console.log(user)
            res.status(200).json({
                user: user
            })
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to login.'
            })
        }
    },

    async flickr (req, res) {
        try {
            const item = await axios.get('https://www.flickr.com/services/feeds/photos_friends.gne')
            // console.log('item', item);

            const json = xml2json.toJson(item)

            console.log('jsoasdsn ', json);

            const photo = await flickr.activity.userPhotos

            res.status(200).json({
                item: photo
            })
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured trying to login.'
            })
        }
    }
}