// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// export const db=mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err)=>{
//     if(err) 
//     {
//         console.log("Mysql connection failed");
//         console.log(err);
//         return;
//     }
//     console.log("Mysql connected successfully");
// });

import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,   // ✅ REQUIRED
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false   // ✅ REQUIRED for Railway
    }
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed");
        console.log(err);
        return;
    }
    console.log("MySQL connected successfully");
});