const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b27ff19432ec1b',
    password: 'c9e52434',
    database: 'heroku_ef57b2865dfc7eb'
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
    const isPrivate = req.body.isPrivate
    if (req.body.succeedes && req.body.preceedes) {
        const succeedes = req.body.succeedes
        const preceedes = req.body.preceedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy, Succeedes, Preceedes, isPrivate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy, succeedes, preceedes, isPrivate], (err, result) => {
            console.log(err);
        })
    }
    else if (!req.body.succeedes && req.body.preceedes) {
        const preceedes = req.body.preceedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy, Preceedes, isPrivate) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy, preceedes, isPrivate], (err, result) => {
            console.log(err);
        })
    }
    else if (req.body.succeedes && !req.body.preceedes) {
        const succeedes = req.body.succeedes

        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy, Succeedes, isPrivate) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy, succeedes, isPrivate], (err, result) => {
            console.log(err);
        })
    }
    else {
        db.query("INSERT INTO task (Grade, LearningObjective, Equipment, CT, Title, Description, Evaluation, Outcome, CreatedBy, isPrivate) VALUES (?,?,?,?,?,?,?,?,?,?)", [grade, learningObjective, equipment, CT, title, description, evaluation, outcome, createdBy, isPrivate], (err, result) => {
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

    db.query("SELECT * FROM task WHERE isPrivate = 0", (err, result) => {
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

    let grade = null;
    let learningObjective = null;
    let equipment = null;
    let CT = null;

    if (req.body.grade) {
        grade = req.body.grade
    }
    if (req.body.learningObjective) {
        learningObjective = req.body.learningObjective.join("| ")
    }
    if (req.body.equipment) {
        equipment = req.body.equipment.join(", ")
    }
    if (req.body.CT) {
        CT = req.body.CT.join(", ")
    }

    if (grade && !learningObjective && !equipment && !CT) {
        db.query("SELECT * FROM task WHERE Grade = ? AND isPrivate = 0", [grade], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (grade && !learningObjective && equipment && !CT) {
        db.query("SELECT * FROM task WHERE Grade = ? AND Equipment = ? AND isPrivate = 0", [grade, equipment], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (grade && !learningObjective && !equipment && CT) {
        db.query("SELECT * FROM task WHERE Grade = ? AND CT = ? AND isPrivate = 0", [grade, CT], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (grade && !learningObjective && equipment && CT) {
        db.query("SELECT * FROM task WHERE Grade = ? AND Equipment = ? AND CT = ? AND isPrivate = 0", [grade, equipment, CT], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (learningObjective && !equipment && !CT) {
        db.query("SELECT * FROM task WHERE LearningObjective = ? AND isPrivate = 0", [learningObjective], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (learningObjective && equipment && !CT) {
        db.query("SELECT * FROM task WHERE LearningObjective = ? AND Equipment = ? AND isPrivate = 0", [learningObjective, equipment], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (learningObjective && !equipment && CT) {
        db.query("SELECT * FROM task WHERE LearningObjective = ? AND CT = ? AND isPrivate = 0", [learningObjective, CT], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (learningObjective && equipment && CT) {
        db.query("SELECT * FROM task WHERE LearningObjective = ? AND Equipment = ? AND CT = ? AND isPrivate = 0", [learningObjective, equipment, CT], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (!grade && !learningObjective && !equipment && CT) {
        db.query("SELECT * FROM task WHERE CT = ? AND isPrivate = 0", [CT], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (!grade && !learningObjective && equipment && !CT) {
        db.query("SELECT * FROM task WHERE Equipment = ? AND isPrivate = 0", [equipment], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
    else if (!grade && !learningObjective && equipment && CT) {
        db.query("SELECT * FROM task WHERE Equipment = ? AND CT = ? AND isPrivate = 0", [equipment, CT], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "No tasks found" });
            }
        })
    }
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

app.post('/updatevisibility', (req, res) => {

    const isPrivate = req.body.isPrivate
    const taskID = req.body.taskID

    db.query("UPDATE task SET isPrivate = ? WHERE TaskID = ?", [isPrivate, taskID], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
    })
})

app.listen(process.env.PORT || 3001, () => {
    console.log("All good!");
});

//Make sure server is running okay
app.get("/", (req, res) => {
    res.send("Hello");
});
