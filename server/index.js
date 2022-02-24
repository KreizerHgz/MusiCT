const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'musict'
});

app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO user (Username, Password) VALUES (?,?)", [username, password], (err, result) => {
        console.log(err);
    })
})

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM user WHERE Username = ? AND Password = ?", [username, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "No user found" });
        }
    })
})

app.post('/submittask', (req, res) => {
    const grade = req.body.grade
    const learningObjective = req.body.learningObjective
    const equipment = req.body.equipment
    const title = req.body.title
    const description = req.body.description
    const createdBy = req.body.createdBy
    if (req.body.succeedes && req.body.preceedes) {
        const succeedes = req.body.succeedes
        const preceedes = req.body.preceedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, Title, Description, CreatedBy, Succeedes, Preceedes) VALUES (?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, title, description, createdBy, succeedes, preceedes], (err, result) => {
            console.log(err);
        })
    }
    else if (!req.body.succeedes && req.body.preceedes) {
        const preceedes = req.body.preceedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, Title, Description, CreatedBy, Preceedes) VALUES (?,?,?,?,?,?,?)", [grade, learningObjective, equipment, title, description, createdBy, preceedes], (err, result) => {
            console.log(err);
        })
    }
    else if (req.body.succeedes && !req.body.preceedes) {
        const succeedes = req.body.succeedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, Title, Description, CreatedBy, Succeedes) VALUES (?,?,?,?,?,?,?)", [grade, learningObjective, equipment, title, description, createdBy, succeedes], (err, result) => {
            console.log(err);
        })
    }
    else {
        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, Title, Description, CreatedBy) VALUES (?,?,?,?,?,?)", [grade, learningObjective, equipment, title, description, createdBy], (err, result) => {
            console.log(err);
        })
    }
})

app.post('/fetchusertasks', (req, res) => {
    const userID = req.body.userID

    db.query("SELECT TaskID, Title FROM task WHERE CreatedBy = ?", [userID], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "No tasks found" });
        }
    })
})

app.post('/fetchtasks', (req, res) => {

    db.query("SELECT * FROM task", (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "No tasks found" });
        }
    })
})

app.listen(3001, () => {
    console.log("All good!");
});

//Make sure server is running okay
app.get("/", (req, res) => {
    res.send("Hello");
});