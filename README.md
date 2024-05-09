# Asset Tracking System - Oklahoma Christian University

This project develops a web application for Support Central and OC Operation, designed to manage and track Oklahoma Christian University's physical assets such as laptops, projectors, routers, chairs, tables, and air conditioners. It focuses on asset acquisition, location, assignment to individuals, and maintenance, with robust frontend and backend systems.

## Features

- **Asset Management**: Track and manage all types of physical assets.
- **Location Tracking**: Monitor current locations/assignments of assets.
- **Assignment Tracking**: Assign assets to individuals and track these assignments.
- **Maintenance and Service Tracking**: Record maintenance and service histories.
- **TSV/CSV Importer**:  The bones for a CSV/TSV importer exists in assetCategory.controller.js, assetType.controller.js, and assetProfile.controller.js that was carried over from the very begining of the project. This uses a bulkCreate fucntion.

## System Aspects Summary

### Backend

The backend is built with Node.js and Express.js, providing a sturdy and efficient server-side platform. Sequelize is used as an ORM for MySQL, facilitating data manipulation and ensuring integrity across operations. This setup guarantees a solid and scalable backend architecture.

### Technologies Used

- **Frontend**: Vue.js, HTML, CSS, Vuetify, and JavaScript, focusing on responsive design and user experience.
- **Backend**: Node.js with Express for server management, JavaScript for server-side logic, and Sequelize as the ORM for database interactions.
- **Database**: MySQL for structured data storage and management.
- **Local Development Environment**: Node.js and MySQL running on local test machines via XAMPP, with Apache server facilitating local hosting and testing.


### Dependencies

- chai-http: `4.4.0`
- connect-history-api-fallback: `2.0.0`
- cors: `2.8.5`
- date-fns: `2.30.0`
- date-fns-tz: `2.0.1`
- dotenv: `16.3.1`
- express: `4.18.2`
- express-fileupload: `1.4.3`
- googleapis: `130.0.0`
- jest: `29.7.0`
- jsonwebtoken: `9.0.2`
- mocha: `10.4.0`
- mysql2: `3.7.0`
- node-cron: `3.0.3`
- nodemailer: `6.9.13`
- parser: `0.1.4`
- sequelize: `6.37.2`
- sinon: `17.0.1`
- supertest: `6.3.3` (*optional*)

