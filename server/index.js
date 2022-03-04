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

app.post('/fetchmytasks', (req, res) => {
    const userID = req.body.userID

    db.query("SELECT * FROM task WHERE CreatedBy = ?", [userID], (err, result) => {
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

app.post('/fetchtask', (req, res) => {

    const taskID = req.body.taskID
    let result = []

    db.query("SELECT * FROM task WHERE TaskID = ?", [taskID], (err, task) => {
        if (err) {
            res.send({ err: err });
        }
        if (task.length > 0) {
            result.push(task[0]);
            if (task[0].Succeedes) {
                db.query("SELECT * FROM task WHERE TaskID = ?", [task[0].Succeedes], (err, succeedes) => {
                    if (err) {
                        res.send({ err: err });
                    }
                    if (succeedes.length > 0) {
                        result.push(succeedes[0]);
                        if (task[0].Preceedes) {
                            db.query("SELECT * FROM task WHERE TaskID = ?", [task[0].Preceedes], (err, preceedes) => {
                                if (err) {
                                    res.send({ err: err });
                                }
                                if (preceedes.length > 0) {
                                    result.push(preceedes[0]);
                                    console.log(result);
                                    res.send(result);
                                }
                            })
                        } else {
                            console.log(result);
                            res.send(result);
                        }
                    }
                })
            }
            else if (task[0].Preceedes) {
                db.query("SELECT * FROM task WHERE TaskID = ?", [task[0].Preceedes], (err, preceedes) => {
                    if (err) {
                        res.send({ err: err });
                    }
                    if (preceedes.length > 0) {
                        result.push(preceedes[0]);
                        console.log(result);
                        res.send(result);
                    }
                })
            }
            else {
                console.log(result);
                res.send(result);
            }
        } else {
            res.send({ message: "Task not found" });
        }
    })
})

app.post('/createwikipage', (req, res) => {

    const title = req.body.title
    const description = req.body.description

    db.query("INSERT INTO wiki (Title, Description) VALUES (?,?)", [title, description], (err, result) => {
        console.log(err);
    })
})

app.post('/fetchwikipage', (req, res) => {

    const title = req.body.title

    db.query("SELECT * FROM wiki WHERE Title = ?", [title], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "No wikipage found" });
        }
    })
})

app.post('/fetchsimilartasks', (req, res) => {

    const learningObjective = req.body.learningObjective
    const equipment = req.body.equipment

    db.query("SELECT * FROM task WHERE LearningObjective = ? AND Equipment = ?", [learningObjective, equipment], (err, result) => {
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

app.post('/updatetask', (req, res) => {

    const grade = req.body.grade
    const learningObjective = req.body.learningObjective
    const equipment = req.body.equipment
    const title = req.body.title
    const description = req.body.description
    const taskID = req.body.taskID

    db.query("UPDATE task SET Grade = ?, LearningObjective = ?, Equipment = ?, Title = ?, Description = ? WHERE TaskID = ?", [grade, learningObjective, equipment, title, description, taskID], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
    })
})

app.post('/deletetask', (req, res) => {

    const taskID = req.body.taskID

    db.query("DELETE FROM task WHERE TaskID = ?", [taskID], (err, result) => {
        if (err) {
            res.send({ err: err });
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