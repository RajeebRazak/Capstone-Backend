const User = require("../models/userschema");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { firstname, lastname, email, password, role, Phonenumber } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      Phonenumber,
    });
    const user = await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const passwordsMatch = await bcrypt.compare(password, User.password);

    if (!passwordsMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.send("Login successful");
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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
// };
