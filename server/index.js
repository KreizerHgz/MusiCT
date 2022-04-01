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
    const learningObjective = req.body.learningObjective.join("| ")
    const equipment = req.body.equipment.join(", ")
    const CT = req.body.CT.join(", ")
    const title = req.body.title
    const description = req.body.description
    const evaluation = req.body.evaluation
    const outcome = req.body.outcome
    const createdBy = req.body.createdBy
    if (req.body.succeedes && req.body.preceedes) {
        const succeedes = req.body.succeedes
        const preceedes = req.body.preceedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy, Succeedes, Preceedes) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy, succeedes, preceedes], (err, result) => {
            console.log(err);
        })
    }
    else if (!req.body.succeedes && req.body.preceedes) {
        const preceedes = req.body.preceedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy, Preceedes) VALUES (?,?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy, preceedes], (err, result) => {
            console.log(err);
        })
    }
    else if (req.body.succeedes && !req.body.preceedes) {
        const succeedes = req.body.succeedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy, Succeedes) VALUES (?,?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy, succeedes], (err, result) => {
            console.log(err);
        })
    }
    else {
        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy) VALUES (?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy], (err, result) => {
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

    const learningObjective = req.body.learningObjective.join("| ")
    const equipment = req.body.equipment.join(", ")
    const CT = req.body.CT.join(", ")

    db.query("SELECT * FROM task WHERE LearningObjective = ? AND Equipment = ? AND CT = ?", [learningObjective, equipment, CT], (err, result) => {
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
    const learningObjective = req.body.learningObjective.join("| ")
    const equipment = req.body.equipment.join(", ")
    const CT = req.body.CT.join(", ")
    const title = req.body.title
    const description = req.body.description
    const evaluation = req.body.evaluation
    const outcome = req.body.outcome
    const taskID = req.body.taskID

    db.query("UPDATE task SET Grade = ?, LearningObjective = ?, Equipment = ?, CT = ?, Title = ?, Description = ?, Evaluation = ?, Outcome = ? WHERE TaskID = ?", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, taskID], (err, result) => {
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