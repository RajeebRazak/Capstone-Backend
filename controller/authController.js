const User = require("../models/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res, next) => {
  const { firstname, lastname, email, password, role, PhoneNumber } = req.body;
  try {
    
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      role,
      PhoneNumber,
    });
    const user = await newUser.save();
    // Create JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 3600 }, // 1 hour expiration
      (err, token) => {
        if (err) throw err;
        res.json({ token });
        console.log("token")
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }

   }
    

exports.login = async (req, res, next ) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
},
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 3600 }, // 1 hour expiration
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

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
