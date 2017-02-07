Rest Api for Blog App.

This assignment is created and tested in the following environment:

OS : Ubuntu 16.04 LTS (64-bit).

Google Chrome Extension : Postman 4.9.2.

Editor : Atom 1.13.1 (64-bit).

How to run:

(Note: these instructions are for Ubuntu Linux based OS. Assuming nodejs, npm and mongodb is already installed).

  running mongodb:

    1). Open Terminal and change directory to where mongodb is installed in bin folder.
    2). user@linux: ~/path/to/mongodb/bin $ ./mongod --dbpath ~/path/to/data/db
    3). press enter database server will start.

  unzipping and installing dependencies:

    1). Unzip the downloaded file.
    2). Open the extracted folder.
    3). Right click somewhere in folder and select Open in Terminal.
    4). Type Command : npm install and press enter. This will install all dependencies shown in package.json file.

  running project:

    5). Now type either: npm start "or" node app.js both will work.
    6). Open Google Chrome browser and go to apps and open Postman.
    7). Type required address for result in Postman.


Description:

=> The project is designed in MVC pattern.

=> Main folder contains :

                folders: app
                         libs
                         middlewares

                files  : app.js
                         package.json

=> package.json:
   file which contains information about the project, i.e. name,description,version,author,and dependencies,etc.

=> app.js:
   file which initializes the project to start server, create express app and listens to port:3000.
   all other data is passed through it.

=> folder : app:
   contains two subfolder namely: controllers,models.
          (note: view folder is not present because project requires only backend business logic api for blog creation.)

=> folder : controllers:
      contains three files:
       createBlog.js : it implements the creation of blog using route:
        (POST)   creation: http://localhost:3000/api/v1/blog/create

       editBlog.js : it implements the updation and deletion of blog using route:
        (PUT)    updation: http://localhost:3000/api/v1/blog/edit/:blogId

        (POST)   deletion: http://localhost:3000/api/v1/blog/delete/:blogId

       viewBlog.js : it implements the reading of all and particular blog using route:
        (GET)    view all: http://localhost:3000/api/v1/blog/all

        (GET)    view particular: http://localhost:3000/api/v1/blog/view/:blogId

=> folder : models:
        contains Blog.js file.
        a blog schema is designed in this file.

=> folder : libs:
        contains responseGenerator.js file.
        used to generate response object which contains error,message,status,data.

=> folder : middlewares:
        contains validate.js file.
        having functions 1). checkTitle(), checks for title is given or defined while creating blog.
                        2). checkUpdatetitle(), checks for if title is not empty while updating blog.

Thats all about it. thanks :)
