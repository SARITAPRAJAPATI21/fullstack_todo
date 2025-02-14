const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const conn = require("../db/conn");

module.exports.register = async (req, res) => {
  const email = req.body.email;
  const hasspass = await bcrypt.hash(req.body.pass, 10);
  console.log(email);

  conn.query("select * from auth where email = ? ", [email], (err, result) => {
    if (result.length > 0)
      return res.status(409).json({ error: "already availabe user" });
    else {
      const q = "INSERT INTO auth (email, pass) VALUES (?,?)";
      conn.query(q, [email, hasspass], (err, result) => {
        if (err) return res.status(500).json({ error: "internal issuse" });
        else return res.status(201).json({ error: "create" });
      });
    }
  });
};

module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(" login page loading", email);
    conn.query(
      "select * from auth where email = ? ",
      [email],
      async (err, result) => {
        if (result.length == 0)
          return res.status(404).json({ error: "user not exits" });
        else {
          const isMatch = await bcrypt.compare(req.body.pass, result[0].pass);
          if (!isMatch) {
            return res.status(401).json({ error: "wrong password" });
          }
          // console.log(result[0].email)
          const token = jwt.sign({ email: email }, "jwt-secret-key", {
            expiresIn: "3h",
          });
          console.log("successfully login");

          return res.status(201).json({ token: token });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

module.exports.verifytoken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const secret = process.env.SECRET_kEY;
    const decoded = jwt.verify(token, secret);
    req.email = decoded.email;

    //console.log("hello verification",decoded)

    next();
  } catch (err) {
    return res.status(500).json({ err: " server error verification" });
  }
};

module.exports.auth = async (req, res) => {
  try {
    // console.log("my home",req.email)

    conn.query(
      "select * from auth where email = ? ",
      [req.email],
      (err, result) => {
        if (result.length == 0)
          return res.status(409).json({ error: " user not exits" });
        else {
          // console.log(result[0])
          return res.status(201).json({ message: "sucessfully verify" });
        }
      }
    );
  } catch (error) {
    console.log("server issuse home");
  }
};
