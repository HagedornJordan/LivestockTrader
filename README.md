# LivestockTrader
A platform to facilitate trading/selling/buying of livestock

# Technologies 
LivestockTrader is primarily built with [NextJS](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Express](https://expressjs.com/), and [MySql](https://www.mysql.com/).

Others include 

* Server
  * [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
  * [cors](https://expressjs.com/en/resources/middleware/cors.html) - To configure cross-origin routing
  * [dotenv](https://www.npmjs.com/package/dotenv) - Loads your .env into express's `process` for easy environment variable access.
  * [express-sessions](https://www.npmjs.com/package/express-session) - Session management. This may be replaced with [NextJS's solution](https://next-auth.js.org/) in the future. 
  * [moment](https://momentjs.com/) - Simplifies handling date/time data.
  * [mysql2](https://www.npmjs.com/package/mysql2) - I chose this client over the official mysql client primarily for the promise wrappers, but mysql2 also boasts better performance.    
  

* Client
  * [Axios](https://axios-http.com/docs/intro) - HTTP client. 
  * [react-select](https://react-select.com/home) - This made handling domains for `<select>` elements much easier. 

# Start Developing

If you don't already have MySQL, you'll need to install it or swap out the DB code for the database of your choosing. When installing MySQL, I recommend using the MySQL Workbench as it makes it very easy to view your data. During the installation, take care to note the root username and password, as you'll need to add this to your .env file (instructions below). Also, create a scheme (database) and add the name to your .env file. If you have issues with the workbench starting the server after reboot, follow the adice in [this thread](https://stackoverflow.com/questions/32022580/failed-to-connect-to-mysql-at-localhost3306-with-user-root/62200315#62200315).
1. Clone this repo `git clone https://github.com/HagedornJordan/LivestockTrader`
2. Install client dependencies
    1. Navigate to `client/client/`
    2. Run `npm install`
3. Install server dependencies
   1. Navigate to `api/`
   2. Run `npm install`
4. Configure your .env file
    1. Rename the skeleton .env at the root of this repo. `mv blankEnv .env`. Remember, you don't want to share this file, so don't modify the .gitignore entry that prevents this from being committed. 
    2. Fill out .env with your parameters.
5. From `api`, run the database initializer function `npm run initiDB`
6. Any time you'd like to reset your DB, run `npm run resetDB`

*Note: If you want to test on other devices on your network, you'll need to add your server's address to next.config.js and swap out all the fetch/axios urls with that address. 
