# UofTextbook (Group 10)

__## NOTE: Please disable AdBlock! We have a script called "ads.js" and Adblock prevents it from running.__

##Live testing site: [I'm an inline-style link](http://timothylock.ca:3000)
- Admin Email: user1@gmail.com
- Admin Password: helloworld
- User Email: Sign up yourself using REAL EMAIL
- User Password: Up to you
__The site does in fact send an email out. The email is coded into the server and is temporary (so don't have the server please). Also use a real email__


##Setup (see lab 6 notes for db setup)<BR>
-make sure path variable in shell contains mongodb commands<BR>
-make a "data" directory<BR>
-run "mongod --dbpath=$PWD/data"<BR>
-open up new tab in terminal<BR>
-make sure path variable in shell contains mongodb commands<BR>
-Optional: if you want to populate the users db using a json file, run "mongoimport --db usersdb --collection users --type json --file test_users.json --jsonArray". Can do the same using a different json file<BR>
-run "npm init"<BR>
-run "npm install mongoose express"<BR>
-run "node server.js" or "nodemon server.js"<BR>
