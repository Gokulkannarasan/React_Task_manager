import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {db} from "../db.mjs";

// REGISTER
export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {

    const checksql="select * from users where email=?";

    db.query(checksql,[email], async (err,resultt)=>{

      if(err)
      {
        return res.status(500).json({error:err.message});
      }

      if(resultt.length>0)
      {
        return res.status(400).json({error:"email is already registered"});
        //alert("user already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
      db.query(sql, [email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({ message: "User registered" });
      });

    });
  } catch (error) {
    res.status(500).json(error);
  }

};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({error:err.message});
    if (result.length === 0)
      
      return res.status(400).json({ error: "User not found" });

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
    



  });
};
