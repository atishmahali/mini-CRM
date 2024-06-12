const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

router.post("/create", (req, res) => {
    const { name, email, audience, filter } = req.body;

    // SQL for inserting new customer
    const sqlInsert = 'INSERT INTO customer SET ?';
    const slug = slugify(name).toLowerCase();

    const data = {
        name: name.toLowerCase(),
        uid: uuidV4(),
        email: email.toLowerCase(),
        filter: filter.toLowerCase(),
        audience: audience.toLowerCase(),
        slug: slug
    };

    db.query(sqlInsert, data, (err) => {
        if (err) {
            return res.status(500).json({ msg: "Unable to create a customer", error: err });
        }

        return res.status(200).json({ data });
    });
});

/**
 * @route Type("get")
 * Read all the customers from the database
 */
router.get("/", (req, res) => {
    const getQuery = 'SELECT * FROM customer';
    db.query(getQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Database query error", error: err });
        }
        return res.status(200).json(results);
    });
});

/**
 * @route Type("put")
 * Update a customer
 */
router.put("/", (req, res) => {
    const { name, email, filter, audience, slug } = req.body;

    // Check if required fields are provided
    if (!name || !email || !filter || !audience || !slug) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const newSlug = slugify(name).toLowerCase();

    let updatedata = 'UPDATE customer SET name = ?, email = ?, filter = ?, audience = ?, slug = ? WHERE slug = ?';

    db.query(updatedata, [
        name.toLowerCase(),
        email.toLowerCase(),
        filter.toLowerCase(),
        audience.toLowerCase(),
        newSlug,
        slug,
    ], (err) => {
        if (err) {
            return res.status(500).json({ msg: "Unable to update the customer record", error: err });
        }

        res.status(200).json({ name, email, filter, audience, updated: true});
    });
});

/**
 * @route Type("delete")
 * Update a customer record
 */
router.delete("/:uid", (req, res) => {
    const {uid} = req.params;
    
    let delQuery = 'DELETE FROM customer WHERE uid = ?';

    db.query(delQuery, [uid], (err, _) => {
        if (err) return res.status(400).json({msg: "Unable to delete"});

        res.status(200).json({success: "true"});
    });
});

module.exports = router;
