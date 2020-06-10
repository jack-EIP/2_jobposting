var Sequelize = require('sequelize');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize({
  // The `host` parameter is required for other databases
  // host: 'localhost'
  dialect: 'sqlite',
  storage: './database/test.sqlite'
});

var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
});

var Company = sequelize.define('company', {
    Ten: {
        type: Sequelize.TEXT,
    },
    Diachi: {
        type: Sequelize.TEXT,
    },
    Thongtin: {
        type: Sequelize.TEXT,
    }
},{
    timestamps: false
});

var Job = sequelize.define('jobs', {
    Chucdanh: {
        type: Sequelize.TEXT,
    },
    Capbac: {
        type: Sequelize.TEXT,
    },
    Nganhnghe: {
        type: Sequelize.TEXT,
    },
    Mota: {
        type: Sequelize.TEXT,
    },
    Yeucaucongviec: {
        type: Sequelize.TEXT,
    },
    Luongmin: {
        type: Sequelize.TEXT,
    },
    Luongmax: {
        type: Sequelize.TEXT,
    },
    Noilamviec: {
        type: Sequelize.TEXT
    }
},{
    timestamps: false
});
 
var curentUser = sequelize.define(`currentUser`,{
    idUser :{
        type:Sequelize.INTEGER
    },
    role :{
        type:Sequelize.INTEGER
    }
});

var Applicant = sequelize.define(`applicants`,{
},{
    timestamps: false
});

Company.belongsTo(User);
// Company.hasMany(Job);
Job.belongsTo(Company);
Job.belongsToMany(User, { as: 'userRegistration', through: Applicant, timestamps: false});
User.belongsToMany(Job, {as: 'jobRegistration',through: Applicant, timestamps: false});
// create all the defined tables in the specified database.
sequelize.sync()
    .catch(error => console.log('This error occured', error));

// export model for use in other files.
module.exports = {
    User,
    Company,
    Job,
    curentUser,
    Applicant
}