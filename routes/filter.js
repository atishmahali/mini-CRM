const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");
const {v4: uuidV4} = require("uuid")

 /**
  * @route Type("post")
  * Create a filter
  */

router.post("/create", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: "Please enter filter parameter name" });
    }

    // SQL for checking existing filter
    let sqlCheck = 'SELECT * FROM filter WHERE slug = ?';
    // SQL for inserting new filter
    let sqlInsert = 'INSERT INTO filter SET ?';
    const slug = slugify(name).toLowerCase();

    db.query(sqlCheck, [slug], (err, filter) => {
        if (err) {
            return res.status(500).json({ msg: "Database query error", error: err });
        }

        if (filter.length > 0) {
            return res.status(400).json({ msg: "Filter exists" });
        }

        const data = {
            filter_name: name.toLowerCase(),
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
  * Create all the filter
  */

router.get("/", (req,res) => {
    let getQuery = 'SELECT * FROM filter';
    db.query(getQuery, (err, results) => {
        return res.status(200).json(results);
    });
});



 /**
  * @route Type("update")
  * Update a course
  */

 router.put("/", (req, res) => {
    const {filter_name, customer, slug} = req.body;
    const newSlug = slugify(filter_name).toLowerCase();

    // if(customer.length == 0)
    //     {
    //         return res.status(400).json({msg: "Please add customer to this filter"})
    //     }

    let updatedata = 'UPDATE filter SET filter_name = ?, filter_customer = ?, slug = ? WHERE slug = ?'

    db.query(updatedata, [
        filter_name.toLowerCase(),
        customer.toString().toLowerCase(),
        newSlug,
        slug,
    ], (err) => {
        if(err) return res.status(400).json({msg: "Unabel to update the filter"});

        res.status(200).json({msg:"Updated"})
    }
)
 });   
 
  /**
  * @route Type("delete")
  * Update a course
  */
router.delete("/", (req, res) => {
    const {filter_id} = req.body;
    
    let delQuery = 'DELETE FROM filter WHERE filter_id = ?';

    db.query(delQuery, [filter_id], (err, _) => {
        if (err) return res.status(400).json({msg: "Unable to delete"});

        res.status(200).json({success: "true"});
    })
})

module.exports = router;
