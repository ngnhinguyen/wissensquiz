const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Member = require('./models/members').default;
const userService = require('./userService');



// Middleware function to authenticate JWT tokensconst 
authenticateToken = (req, res, next) => {
    console.warn('Authenticating token', req.headers);
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token not provided" });
    }

    userService.verifyToken(token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        req.user = decoded; next();
    });
};


// GET all members
router.get('/members', authenticateToken, async (req, res) => {
    const allMembers = await Member.find();
    console.log(allMembers); 
    res.send(allMembers);
});

//post
router.post('/members', async (req, res) => {
    try {
        const newMember = new Member({
            forename: req.body.forename, // Verwende "forename" statt "firstname"
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
        });
        await newMember.save();
        res.status(201).send(newMember);
    } catch (err) {
        res.status(500).send({ error: 'Error creating member', details: err });
    }
});


// get one member via id
router.get('/members/:id', async (req, res) => {
    const member = await Member.findOne({ _id: req.params.id });
    console.log(req.params);
    if (member) {
        res.send(member);
    } else {
        res.status(404);
        res.send({
            error: "Member does not exist!"
        });
    }
})

// Update one member
router.put('/members/:id', async (req, res) => {
    try {
        // Dynamisch die Felder aktualisieren
        const updates = {};
        if (req.body.forename) {  // Verwende "forename" statt "firstname"
            updates.forename = req.body.forename;
        }
        if (req.body.surname) {
            updates.surname = req.body.surname;
        }
        if (req.body.email) {
            updates.email = req.body.email;
        }

        // Aktualisiere das Dokument in der Datenbank
        const updatedMember = await Member.findOneAndUpdate(
            { _id: req.params.id }, // Filter
            { $set: updates },      // Aktualisierungen
            { new: true }           // Rückgabe des aktualisierten Dokuments
        );

        // Überprüfe, ob ein Dokument gefunden wurde
        if (!updatedMember) {
            return res.status(404).send({ error: 'Member not found' });
        }

        res.status(200).send(updatedMember);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating member', details: error });
    }
});

// delete one member via id
router.delete('/members/:id', async (req, res) => {
    try {
        await Member.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Member.findOne({ email: email });

    console.log(email, password);
    console.log(user)

    if (!user || !(password === user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = userService.generateToken(user);
    res.status(200).json({ token });
});


module.exports = router; // Am Ende der Datei platzieren
