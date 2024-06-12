const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const { v4: uuidV4 } = require("uuid");

/**
 * @route Type("post")
 * Create a filter
 */
router.post("/create", (req, res) => {
    const { name } = req.body;

    // Simple Validation
    if (!name) {
        return res.status(400).json({ msg: "Please enter the filter parameter name" });
    }

    // SQL for checking existing filter
    let sqlCheck = 'SELECT * FROM communication_log WHERE slug = ?';
    // SQL for inserting new filter
    let sqlInsert = 'INSERT INTO communication_log SET ?';
    const slug = slugify(name).toLowerCase();

    db.query(sqlCheck, [slug], (err, communication_log) => {
        if (err) {
            return res.status(500).json({ msg: "Database query error", error: err });
        }

        if (communication_log.length > 0) {
            return res.status(400).json({ msg: "Filter exists" });
        }

        const data = {
            audience_type: name.toLowerCase(),
            slug: slug,
            uid: uuidV4(),
        };

        db.query(sqlInsert, data, (err, result) => {
            if (err) {
                return res.status(400).json({ msg: "Unable to insert filter", error: err });
            }

            return res.status(200).json({ data });
        });
    });
});

/**
 * @route Type("get")
 * Read all the communication_log
 */
router.get("/", (req, res) => {
    let getQuery = 'SELECT * FROM communication_log';
    db.query(getQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Database query error", error: err });
        }
        return res.status(200).json(results);
    });
});

/**
 * @route Type("update")
 * Update a communication_log
 */
router.put("/", (req, res) => {
    const { audience_type, slug } = req.body;

    // Simple Validation
    if (!audience_type || !slug) {
        return res.status(400).json({ msg: "Please provide both audience_type and slug" });
    }

    const newSlug = slugify(audience_type).toLowerCase();

    let updatedata = 'UPDATE communication_log SET audience_type = ?, slug = ? WHERE slug = ?';

    db.query(updatedata, [audience_type.toLowerCase(), newSlug, slug], (err) => {
        if (err) {
            return res.status(400).json({ msg: "Unable to update the audience", error: err });
        }

        res.status(200).json({ msg: "Updated" });
    });
});

  /**
  * @route Type("delete")
  * Update a course
  */
  router.delete("/:uid", (req, res) => {
    const {uid} = req.params;
    
    let delQuery = 'DELETE FROM communication_log WHERE uid = ?';

    db.query(delQuery, [uid], (err, _) => {
        if (err) return res.status(400).json({msg: "Unable to delete"});

        res.status(200).json({success: "true"});
    });
});


module.exports = router;
