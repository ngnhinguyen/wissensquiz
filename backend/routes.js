const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Question = require('./models/question');
const Member = require('./models/members'); //.default entfernt
const userService = require('./userService');

router.delete('/questions/:question', async (req, res) => {
    try {
        await Question.deleteOne({  _id: req.params.question });
        res.status(200).send();
    } catch (error) {
        res.status(404).send({ error: 'Question not found' });
    }
});

// POST: Neue Frage erstellen
router.post('/questions', async (req, res) => {
    try {
        const newQuestion = new Question({
            question: req.body.question,
            answer: req.body.answer,
            category: req.body.category,
            difficulty: req.body.difficulty
        });
        await newQuestion.save();
        res.status(201).send(newQuestion);
    } catch (error) {
        console.error('Fehler beim Erstellen der Frage:', error);
        res.status(500).json({ message: 'Fehler beim Erstellen der Frage', error });
    }
});

// GET: Fragen nach Kategorie abrufen
router.get('/questions/category/:category', async (req, res) => {
    try {
        const category = req.params.category;  // Kategorie aus URL-Parameter abrufen
        const questions = await Question.find({ category: category });

        if (questions.length === 0) {
            return res.status(404).json({ message: "Keine Fragen gefunden" });
        }
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Fragen", error });
    }
});

//getall questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find(); // Alle Fragen abrufen
        console.log('Geladene Fragen:', questions); // Debugging
        res.json(questions);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fragen:', error); // Logge den Fehler ins Terminal
        res.status(500).json({ message: 'Fehler beim Abrufen der Fragen', error });
    }
});

// Update one question
router.put('/questions/id/:id', async (req, res) => {
    try {
        // Dynamisch die Felder aktualisieren
        let updates = {};
        if (req.body) {
            updates = req.body;
        }
        // Aktualisiere das Dokument in der Datenbank
        const updatedQuestion = await Question.findOneAndUpdate(
            { _id: req.params.id }, // Filter
            { $set: updates },      // Aktualisierungen
            { new: true }           // Rückgabe des aktualisierten Dokuments
        );

        // Überprüfe, ob ein Dokument gefunden wurde
        if (!updatedQuestion) {
            return res.status(404).send({ error: 'Question not found' });
        }
        res.status(200).send(updatedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating question', details: error });
    }
});

//Express backend mit node.js mit express empfängt daten und verarbeitet sie

// Middleware function to authenticate JWT tokensconst 
// Die Funktion wird aufgerufen, wenn ein Token in den Header der Anfrage gesetzt wird
// Die Funktion überprüft, ob das Token gültig ist und fügt das dekodierte Token dem Request-Objekt hinzu
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

// GET all members, aber nur wenn der Benutzer authentifiziert ist bzw eingeloggt ist
//In der Datenbank MongoDB wird in der collection (tabellensammlung von mitgleidern) sucht die Abfrage nach members Objekten und gibt sie zurück
//Die Funktion ist asynchron, da sie auf die Datenbank warten muss
router.get('/members', authenticateToken, async (req, res) => { //members extrahieren aus der Anfrage
    const allMembers = await Member.find();
    console.log(allMembers); 
    res.send(allMembers); //Json Daten zurückgeben (siehe members.js datei unter models), falls Datenbank gefüllt mit Members
}); //Methode getAll() gibt die JSON Daten zurück an z.B. tablecomponent.ts

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

// delete one member via members/:id
router.delete('/members/:forename', async (req, res) => {
    try {
        await Member.deleteOne({ forename: req.params.forename })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});

//API Endpunkt login - empfängt mail und passwort vom frontend (login.component.ts)
//login post request. backend prüft zugangsdaten (mongodb sucht nach user und prüft passwort)
//wenn user gefunden wird, wird token generiert und zurückgegeben
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Member.findOne({ email: email }); //sucht in MongoDB nach dem User mit der email

    console.log(email, password);
    console.log(user)

    if (!user || !(password === user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = userService.generateToken(user); //methode generateToken aus userService.js wird aufgerufen
    res.status(200).json({ token }); //token wird zurückgegeben
});

module.exports = router; // Am Ende der Datei platzieren
