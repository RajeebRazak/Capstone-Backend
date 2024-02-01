
const user = require('../models/userschema')

exports.register = async (req, res) => {
    const newuser = new user({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        Phonenumber: req.body.Phonenumber
      });
      try {
        const user = await newuser.save();
        res.send("User Registered Successfully");
      } catch (error) {
        return res.status(400).json({ error });
      }

    }

//     try {
//         // Connect to MongoDB
//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();

//         // Access the database
//         const db = client.db("Service"); // Replace "your_database_name" with your actual database name

//         // Access the collection
//         const usersCollection = db.collection("Customerdata"); // Replace "users" with your actual collection name

//          // Extract data from request body
//          const { email, password, phoneNumber } = req.body;

//          // Create a new user object
//          const newUser = {
//              email,
//              password,
//              phoneNumber,
             
//          };
 
//         // Insert the user document into the collection
//         await usersCollection.insertOne(newUser);

//         // Close the connection
//         await client.close();

//         // Respond with success message
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         // Handle errors
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Error registering user' });
//     }
// };
