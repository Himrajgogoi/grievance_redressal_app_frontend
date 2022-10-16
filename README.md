This project has been built using Next.js and deployed over vercel.

The folder structure is as follows:

![Alt text](./folder.png?raw=true "Folder Structure")

1. Here, we have the components folder in which we have defined the reusable components for the application

2. In the pages folder, we have defined the various routes of the application and two special files the _app.js and _document.js
---> In _app.js, we wrap the page components with the necessary Header and Footer along with other Wrappers, one for DateTimePicker and the other for toasts in the application.

----> In  _document.js, we add the necessary meta and link tags since this application uses google fonts and is a PWA (Progressive Web Application).

3. In the pages/api folder, we have defined the api endpoints which interact with our server to process our requests.

4. The public folder contains all the images and icons that we use throughout our application and also the manifest.json file for providing the properties of our PWA like color themes, start url, which icons to use etc.

5. The styles folder contains the css files for our application.

This project in its basic form tends to act as the first step to a more comprehensive application with more powerful functionalities. We will make this project open source for the students of our college, Jorhat Engineering College, to collaborate and contribute collectively to take this project further and make it more complete.

Cheers !

