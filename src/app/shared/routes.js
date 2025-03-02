const express = require('express');
const router = express.Router();
const Member = require('./models/members').default;

// GET all members
router.get('/members', async (req, res) => {
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
            ipaddress: req.body.ipaddress,
        });
        await newMember.save();
        res.status(201).send(newMember);
    } catch (err) {
        res.status(500).send({ error: 'Error creating member', details: err });
    }
});


// get one member via id
router.get('/members/:id', async(req, res) => {
    const member = await Member.findOne({ _id: req.params.id });
    console.log(req.params);
    if(member) {
        res.send(member);
    } else {
        res.status(404);
        res.send({
            error: "Member does not exist!"
        });
    }
})

// Update one member
router.patch('/members/:id', async (req, res) => {
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
        if (req.body.ipaddress) {
            updates.ipaddress = req.body.ipaddress;
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
router.delete('/members/:id', async(req, res) => {
    try {
        await Member.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});


module.exports = router; // Am Ende der Datei platzieren
