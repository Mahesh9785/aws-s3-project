const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config();

const swaggerDocs = require('./docs/swagger');

const User = require('./models/user.model');

const bucketRoutes = require('./controller/bucketController');
const fileRoutes = require('./controller/fileController');
const userRoutes = require('./controller/userController');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true, 
    keepAliveInitialDelay: 300000
    };

mongoose.set('strictQuery', true);
    
mongoose.connect(
process.env.DB_URL,
options
)
.then(()=>console.log('Database Connected'))
.catch(e=>console.log(e));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create demo user
const createDemoUser = async (username) => {
    const existingUser = await User.findOne({ username }).exec();

    if (existingUser) {
      console.info("User with the provided username already exists");
    } else {
        const demoUser = new User({
        username: username,
        password: await bcrypt.hash('password', 10),
        role: 'admin'
        });
        try {
        await demoUser.save();
        console.log('Demo user created');
        } catch (error) {
        console.error('Error creating demo user:', error);
        }
    }
}

// Routes
app.use('/api/buckets', bucketRoutes);
app.use('/api/bucket', fileRoutes);
app.use('/api/login', userRoutes);

swaggerDocs(app);

app.listen(process.env.PORT, async () => {
  console.log('Server started on port 3000');
  await createDemoUser('Mahesh');
});

module.exports = app;
