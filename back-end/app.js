const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const app = express();
app.use(cors());

const companyRoute = require('./routes/company');

//models
const Company = require('./models/company');
const Review = require('./models/reviews');



app.use(bodyParser.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(companyRoute);

// app.use(express.json());

//Associations
Company.hasMany(Review, { foreignKey: 'companyId' });
Review.belongsTo(Company, { foreignKey: 'companyId' });

sequelize.sync()
.then((res)=>{
    app.listen(2000);
    // console.log(res);
})
.catch((err)=>{
    console.log(err);
})


