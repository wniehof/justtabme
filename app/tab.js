// app/tab.js

var Tab       = require('../app/models/tab');
var User      = require('../app/models/user');

    // Create New Tab page
    exports.create_get = function(req, res){
		res.render('createtab.ejs', {
			user : req.user // get the user out of session and pass to template
		});
    };
            
    // Post Create New Tab        
    exports.create_post = function(req, res){
        var newTab          = new Tab();
                    //Creating the new tab with all data
                    newTab.name    = req.body.user.firstname;
                    newTab.description = req.body.user.lastname;
                    newTab.currency  = req.body.user.mail;

     

                    // save the tab
                    newTab.save(function(err, savedTab) {
                        if( err || !savedTab ) console.log("Tab not created, something went wrong");
                        else
                            User.update(
                                {_id: req.user._id}, {
                                    $addToSet: {tabs: {id: savedTab._id, name: savedTab.name}}
                                    },
                                    function(err, updated){
                                        if (err) {
                                        res.json({"error": err});
                                            }
                                        res.json({"updated": updated});
    });
                        
                            console.log("Tab:" + newTab.name + " created" + savedTab + req.user);
                            res.render('profile.ejs', { user : req.user // get the user out of session and pass to template
		});    
                    });
    };
    
    
        // Get Tabs page
    exports.get_get = function(req, res){
        User.find({ _id : req.user._id }) .exec(function (err, user){
    console.log("ID: " + req.user._id + "tabs" + user.tabs );
            res.json(user.tabs);
});
			};
    
    