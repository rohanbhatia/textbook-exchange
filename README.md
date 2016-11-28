# group10

## NOTE: Please disable AdBlock! We have a script called "ads.js" and Adblock prevents it from running.
Temporary testing links:
- View index: http://timothylock.ca:3000
- Browse as user: http://timothylock.ca:3000/allAds.html
- Browse as admin: We'll do it once we figure out how to cookie


Setup (see lab 6 notes for db setup)<BR>
-make sure path variable in shell contains mongodb commands<BR>
-make a "data" directory<BR>
-run "mongod --dbpath=$PWD/data"<BR>
-open up new tab in terminal<BR>
-make sure path variable in shell contains mongodb commands<BR>
-Optional: if you want to populate the users db using a json file, run "mongoimport --db usersdb --collection users --type json --file test_users.json --jsonArray". Can do the same using a different json file<BR>
-run "npm init"<BR>
-run "npm install mongoose express"<BR>
-run "node server.js" or "nodemon server.js"<BR>
