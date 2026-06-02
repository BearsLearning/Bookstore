const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/*Getting Books*/
app.get("/books", (req, res) => {
    db.query(
        "SELECT * FROM books",
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
});

/*Searching Books*/
app.get("/books/search/:keyword", (req, res) => {
    const keyword = "%$(req.params.keyword)%";
    db.query(
        "SELECT * FROM books WHERE title LIKE ? OR author LIKE ?",
        [keyword, keyword],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(results);
        }
    );
});

/*Add Book*/
app.post("/books", (req, res) => {
    const { title, author, price, category,image}=req.body;
    db.query(
        "INSERT INTO books (title, author, price, category,image) VALUES (?, ?, ?, ?, ?)",
        [title, author, price, category,image],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({message:"Book Added"});
        }
    );
});


/*Delete Book*/
app.delete("/books/:id", (req, res) => {
    db.query(
        "DELETE FROM books WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({message:"Book Deleted"});
        }
    );
});

app.listen(3000, () =>{console.log("Server running on port 3000");});