var express = require("express");
var router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var fs = require('fs');

let Domain ="http://localhost:3000";
// let Domain ="https://test.deepfakequiz.com:3000";

const GoogleRedirectUri = `${Domain}/api/oauth/complete`
var nonce = "16yu43";

let redirectURL
// app.use(passport.initialize())
// app.use(passport.session())

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "199718064485-gm6lbrk6n4fmn991oe2osqihpu3rrbnc.apps.googleusercontent.com",
      clientSecret: "gv_ay27fzmBvBCnqVfEDnxxg",
      callbackURL: GoogleRedirectUri,
      passReqToCallback: true,
      accessType: 'offline',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    (req, accessToken, refreshToken, profile, cb) => {
      let user = {}
			user.id = profile.id
			user.displayName = profile.displayName
			user.picture = profile._json.picture
			user.google = {}
			user.google.id = profile.id
			user.google.accessToken = accessToken
			user.google.refreshToken = refreshToken
			user.email = profile.emails[0].value
      // Extract the minimal profile information we need from the profile object
      // provided by Google
      
      console.log({user})
      cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// router.get("/googlesignin", (req, res, next) => {
//   redirectURL = req.headers.referer
//   console.log({redirectURL})
//   console.log({passport})
//   passport.authenticate('google', {
// 		scope: [
// 			'https://www.googleapis.com/auth/userinfo.profile',
// 			'https://www.googleapis.com/auth/userinfo.email'
// 		]
// 	})(req, res, next)
// });

router.get(
  // Login url
  '/googlesignin',

  // Save the url of the user's current page so the app can redirect back to
  // it after authorization
  (req, res, next) => {
    redirectURL = req.headers.referer
    console.log({redirectURL})
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },

  // Start OAuth 2 flow using Passport.js
  passport.authenticate('google', {scope: ['email', 'profile']})
);

router.get(
  
  '/googlelogout',

  // Save the url of the user's current page so the app can redirect back to
  // it after authorization
  (req, res, next) => {
    redirectURL = req.headers.referer
    req.session = null
	  res.redirect('/')
  }
);

router.get('/oauth/complete', (req, res, next) => {
	console.log('/oauth/complete ....')
	passport.authenticate(
		'google',
		{ failWithError: true },
		async (err, user, info) => {
      console.log('passport.authenticate: Callback: user = ', user)
			if (err) {
				return res.status(403).send({ message: err.message })
			}
			if (!user) {
				return res.status(403).send({ message: 'System Error' })
			}

      // return res.status(200).send(user)
      var json = JSON.stringify(user);
      fs.writeFile( "userData.json", json, "utf8", function writeFileCallBack(err, data) {
          if (err) {
              console.log(err);
          } else {
              return res.redirect(redirectURL+'start');
          }
      });
      
		}
	)(req, res, next)
})

router.get('/getUser', (req, res) => {

	fs.readFile("userData.json", "utf8", function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        var obj = JSON.parse(data); //now it an object
        return res.send(obj);
    }
});
})

router.post('/getData', (req, res) => {
  var experiment = req.body.experiment
	fs.readFile("./public/"+experiment+"/exp/SCRIPT.json", "utf8", function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        var obj = JSON.parse(data); //now it an object
        return res.send(obj);
    }
  });
})

router.post('/df', (req, res) => {
  
  if ( req.body.nonce != nonce ) {
    console.log("nonce check failed.");
    res.sebd("invalid POST request.");
    return;
  }

  dt = new Date().getTime()

	var json = JSON.stringify(req.body);
  fs.writeFile( "./data/results_" + req.body.id + "_" + dt, json, "utf8", function writeFileCallBack(err, data) {
      if (err) {
          console.log(err);
      } else {
          return res.send('received result.');
      }
  });
})

// router.get(
//   // OAuth 2 callback url. Use this url to configure your OAuth client in the
//   // Google Developers console
//   '/oauth/complete',

//   // Finish OAuth 2 flow using Passport.js
//   passport.authenticate('google'),

//   // Redirect back to the original page, if any
//   (req, res) => {
//     console.log({res})
//     res.redirect(redirectURL);
//   }
// );

module.exports = router;
