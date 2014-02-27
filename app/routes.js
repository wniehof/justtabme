// app/routes.js

// Module dependencies
var tab      = require('./tab.js');


module.exports = function(app, passport) {
    
	// route for home page
	app.get('/', function(req, res) {
        if (req.isAuthenticated())
		res.redirect('/profile'); // Redirect to profile page if already authenticated
			res.render('index.ejs'); // If not authenticated, open index page
	});


	// route for showing the profile page
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

    // route for logging out
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
	
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
            
            
            
            
    // Create New Tab        
    app.get('/createtab', isLoggedIn, tab.create_get);     
            
    // Post Create New Tab        
    app.post('/createtab', isLoggedIn, tab.create_post); 
            

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}