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
  
