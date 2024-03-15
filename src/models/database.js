const mongoose = require('mongoose');
const USER = process.env.USER_DB

// MongoDB connection URI
const URI = `mongodb+srv://sistemaodonto87:12345678910CGVSI@clusteragendamento.f8jwdzy.mongodb.net/clinicaodonto?retryWrites=true&w=majority&appName=ClusterAgendamento` ; // Replace 'your_database_name' with your actual database name


/*  mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);  */

mongoose.connect(URI)
.then(()=>console.log('DB is UP!'))
.catch((err)=>console.log(err))


// Export the Mongoose instance for use in other parts of the application
module.exports = mongoose;
