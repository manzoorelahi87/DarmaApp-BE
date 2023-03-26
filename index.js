const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app = express();

app.use(cors());
app.use(bodyparser.json());


//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'simpledb',
    port: 3306
});


//Check database connection
db.connect( err => {
    if(err){
        console.log(err, 'DB Error');
    }
    console.log('Database connected');
});

//Get All data
app.get('/user', (req,res)=>{


    let qr =`select * from user`;
    db.query(qr, (err, result)=>{

        if(err){
            console.log(err, 'err')
        }

        if (result.length >0){
            res.send({
                message: 'All user data',
                data: result
            });
        }

    });
});

//Get single data
app.get('/user/:id', (req,res)=>{

    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

          if (result.length >0){
            res.send({
                message: 'Get single data',
                data: result
            });
        }
        else{
            res.send({
                message: 'Data not found'
            })
        }

    });

});

//Create data
app.post('/user', (req,res)=>{

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `insert into user (fullname, email, mobile) values ('${fullName}', '${eMail}', '${mb}')`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

        res.send({
            message: 'Data inserted'
        })

    });

});



// Update data
app.put('/user/:id', (req,res)=>{

    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `update user set fullname = '${fullName}', email = '${eMail}', mobile = '${mb}'
              where id =${gID}`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

          res.send({
            message: 'Data updated'
        })


    });

});



//Delete single data
app.delete('/user/:id', (req,res)=>{

    let qID = req.params.id;

    let qr = `delete from user where id = '${qID}'`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

        res.send({
            message: 'Data deleted'
        })

    });

});


//Members table


// //Check database connection
// db.connect( err => {
//     if(err){
//         console.log(err, 'DB Error');
//     }
//     console.log('Database connected');
// });

//Get All data
app.get('/members', (req,res)=>{


    let qr =`select * from members`;
    db.query(qr, (err, result)=>{

        if(err){
            console.log(err, 'err')
        }

        if (result.length >0){
            res.send({
                message: 'All user data',
                data: result
            });
        }

    });
});

//Get single data
app.get('/profile/:id', (req,res)=>{

    let gID = req.params.id;
    let qr = `select * from members where id = ${gID}`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

          if (result.length >0){
            res.send({
                message: 'Get single data',
                data: result
            });
        }
        else{
            res.send({
                message: 'Data not found'
            })
        }

    });

});

//Create data
app.post('/profile', (req,res)=>{
    console.log("Inside profile")

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let associationUnit = req.body.associationUnit;
    let mobileNo = req.body.mobileNo;
    let landlineCode = req.body.landlineCode;
    let landlineNo = req.body.landlineNo;
    let email = req.body.email;
    let dateOfBirth = req.body.dateOfBirth;
    let spouseName = req.body.spouseName;
    let spouseDOB = req.body.spouseDOB;
    let maleChildren = req.body.maleChildren;
    let femaleChildren = req.body.femaleChildren;
    let profilePhoto = req.body.profilePhoto;
    let notes = req.body.notes;

    let qr = `insert into members (firstname, lastname, address, unit, mobile, landcode, landline, email, dob, spouse, sdob, male, female, photo, notes) values ('${firstName}', '${lastName}', '${address}',
    '${associationUnit}', '${mobileNo}', '${landlineCode}', '${landlineNo}', '${email}', '${dateOfBirth}', '${spouseName}', '${spouseDOB}', '${maleChildren}',
    '${femaleChildren}', '${profilePhoto}', '${notes}')`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

        res.send({
            message: 'Data inserted'
        })

    });

});



// Update data
app.put('/profile/:id', (req,res)=>{

    let gID = req.params.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let associationUnit = req.body.associationUnit;
    let mobileNo = req.body.mobileNo;
    let landlineCode = req.body.landlineCode;
    let landlineNo = req.body.landlineNo;
    let email = req.body.email;
    let dateOfBirth = req.body.dateOfBirth;
    let spouseName = req.body.spouseName;
    let spouseDOB = req.body.spouseDOB;
    let maleChildren = req.body.maleChildren;
    let femaleChildren = req.body.femaleChildren;
    let profilePhoto = req.body.profilePhoto;
    let notes = req.body.notes;

    let qr = `update members set firstname = '${firstName}', lastname = '${lastName}', address = '${address}',    unit = '${associationUnit}', mobile = '${mobileNo}', landcode = '${landlineCode}', landline = '${landlineNo}', email = '${email}', dob = '${dateOfBirth}',  spouse = '${spouseName}', sdob = '${spouseDOB}', male = '${maleChildren}', female = '${femaleChildren}', photo = '${profilePhoto}', notes = '${notes}' where id =${gID}`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

          res.send({
            message: 'Data updated'
        })


    });

});



//Delete single data
app.delete('/profile/:id', (req,res)=>{

    let qID = req.params.id;

    let qr = `delete from members where id = '${qID}'`;

     db.query(qr, (err, result)=>{

         if(err){
            console.log(err, 'err')
        }

        res.send({
            message: 'Data deleted'
        })

    });

});
app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});

//Login component
app.post('/login', (req,res)=>{    

  let email = req.body.email;
  let password = req.body.password;

   // checkemailid
   let chkemailid = `select * from users where email = '${email}'`;
   db.query(chkemailid, async (err, result) => {
     if (err) throw err;if (result.length > 0) {
        let data = {
          name: result[0].name,
          email: result[0].email,
        };
        //    check password
        let chkpwd = await bcrypt.compare(password, result[0].password);
        console.log(chkpwd, "chkpwd##");
        if (chkpwd === true) {
          const token = jwt.sign({ data }, "privatkey");
          console.log(token, "token##");
          res.send({
            status: true,
            token: token,
            result: data,
            msg: "user login successful",
          });
        } else {
          res.send({
            status: false,
            msg: "invalid user",
          });
        }
      } else {
        res.send({
          status: false,
          msg: "invalid email id",
        });
      }
    });
  });


//signup 

app.post("/signup", (req,res)=>{
const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // first check email id already exit
  let emailchkqry = `select email from users where email = '${email}' `;
  db.query(emailchkqry, async (err, result) => {
    if (err) throw err;
    // check email id already exits
    if (result.length > 0) {
      res.send({
        status: false,
        msg: "email id already exits",
      });
    } else {
      // password decrypt
      decryptpwd = await bcrypt.hash(password, 10);
      // insert data
      let insertqry = `insert into users(name,email,password) values('${name}','${email}','${decryptpwd}') `;
      db.query(insertqry, (err, result) => {
        if (err) throw err;
        res.send({
          status: true,
          msg: "user register successful",
        });
      });
    }
  });
});

// requiredtoken
function requiredtoken(req, res, next) {
    let headers = req.headers["token"];
    console.log(headers, "token##");
    if (typeof headers !== undefined && headers !== "") {
      req.token = headers;
      next();
    } else {
      res.send({
        status: false,
        msg: "token required ...",
      });
    }
  }
