
Implementation summary:

1. Added extra sorting function by FirstName, LastName, Email, and Phone1.
   (When hover on those columns, there is tooltip showing "Click to sort by xxxxx")


Deployment/testing summary:

1. http://localhost:5000/index.html for the SPA instead of http://localhost:5000;
2. http://http://localhost:5000/api/customer for API


Somethings to do if possible:

1. API versioning;
2. Better styling;
3. Unit testing;
4. Logging;
5. Use Swagger;
 

Time summary:

1. Preparation: 0.5 hour (Download and install Visual Studio 2019 and Note.js and other packages);
2. Coding: 4.5 hours;
3. Styling: 1 hour;
4. Building and testing: 0.5 hour
5. Trying to fix following exception: 1 hours 

Grand total: 7.5 hours

(There was a exception of "An unhandled exception occurred while processing the request." when running the solution on http://localhost:5000,
so I put the SPA under wwwroot folder, as the result, please use http://localhost:5000/index.html for the SPA)


