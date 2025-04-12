const express = require("express");
const router = express.Router();

const { addPerson, getPeople, getPersonById, updatePerson, deletePerson } = require("../controllers/people");

router.get("/", getPeople); // GET all people
router.post("/", addPerson);   // POST new person
router.get("/:id", getPersonById); //GET a specific person
router.put("/:id", updatePerson);// PUT update a specific person by ID
router.delete("/:id", deletePerson);

module.exports = router;