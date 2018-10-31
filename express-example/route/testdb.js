// const Sequelize = require('sequelize');
// const sequelize = new Sequelize( process.env.DB_DATABASE,  process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },

//   // SQLite only

//   // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
//   operatorsAliases: false
// });
// const User = sequelize.define('user_test', {
//   uid: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true // Automatically gets converted to SERIAL for postgres
//   },
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// });

const knex = require('knex')({
  client: 'mysql2',
  // version: '5.7',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
  },
  pool: { min: 0, max: 7 }
});
  

module.exports= async function (req,res,next) {
  const data =await knex.schema.dropTableIfExists('user_knex').createTable('user_knex', function(table) {
    table.increments('uid');
    table.string('firstName');
    table.string('lastName');
    table.timestamps(true,true);
    // no time default in knex
  }).then(function() {
    return knex.insert({firstName: 'Tim',lastName:'Hardy'}).into('user_knex');
  }).catch(function(e) {
    res.send({
              msg:'Unable to connect to the database:', err
          })
          console.error('Unable to connect to the database:', err);
  });
  res.send({
            msg:'Connection has been established successfully.',
            data:data
  })
    // const data =    User.sync({force: true}).then(() => { // force: true will drop the table if it already exists
    //   // Table created
    //   return User.create({
    //     firstName: 'John',
    //     lastName: 'Hancock'
    //   });
    // });
    // sequelize
    // .authenticate()
    // .then(() => {
    //     res.send({
    //         msg:'Connection has been established successfully.',
    //         data:data
    //     })

    // })
    // .catch(err => {
    //     res.send({
    //         msg:'Unable to connect to the database:', err
    //     })
    //   console.error('Unable to connect to the database:', err);
    // });
}