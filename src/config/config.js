require('dotenv').config();
const {PGDIALECT, PGDATABASE, PGPASSWORD, PGUSER, PGHOST } = process.env;

require('dotenv').config();

// module.exports = {
//     development: {
//         "dialect": "postgres",
//         "username": "postgres",
//         "password": "postgres",
//         "database": "SkillOval",
//         "host": "localhost",
//     },
//     test: {
//         use_env_variable: 'DATABASE_URL',
//         dialet: 'postgres',
//     }

// }

module.exports = {
    development: {
        "dialect": `${PGDIALECT}`,
        "username": `${PGUSER}`,
        "password": `${PGPASSWORD}`,
        "database": `${PGDATABASE}`,
        "host": `${PGHOST}`,
    },
    test: {
        use_env_variable: 'DATABASE_URL',
        dialet: 'postgres',
    }
}
