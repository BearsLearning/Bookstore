const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const imagesDir = path.join(__dirname, '../Frontend/Images');
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use('/images', express.static(imagesDir));

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
    const keyword = `%${req.params.keyword}%`;
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
app.post("/books", upload.single('image'), async (req, res) => {
    try {
        const { title, author, price, category } = req.body;
        let image = null;

        if (req.file) {
            const fileBuffer = req.file.buffer;
            const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
            const ext = path.extname(req.file.originalname) || '.jpg';
            const files = await fs.promises.readdir(imagesDir);

            for (const file of files) {
                const existingBuffer = await fs.promises.readFile(path.join(imagesDir, file));
                const existingHash = crypto.createHash('sha256').update(existingBuffer).digest('hex');
                if (existingHash === fileHash) {
                    image = file;
                    break;
                }
            }

            if (!image) {
                image = `${fileHash}${ext}`;
                await fs.promises.writeFile(path.join(imagesDir, image), fileBuffer);
            }
        }

        db.query(
            "INSERT INTO books (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)",
            [title, author, price, category, image],
            (err, results) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.json({message:"Book Added"});
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/*Delete Book*/
app.delete("/books/:id", (req, res) => {
    db.query(
        "SELECT image FROM books WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Book not found" });
            }

            const imageName = results[0].image;
            db.query(
                "DELETE FROM books WHERE id = ?",
                [req.params.id],
                async (deleteErr, deleteResults) => {
                    if (deleteErr) {
                        return res.status(500).json(deleteErr);
                    }

                    if (imageName) {
                        db.query(
                            "SELECT COUNT(*) AS count FROM books WHERE image = ?",
                            [imageName],
                            async (countErr, countResults) => {
                                if (!countErr && countResults[0].count === 0) {
                                    try {
                                        await fs.promises.unlink(path.join(imagesDir, imageName));
                                    } catch (unlinkErr) {
                                        // Ignore missing file errors
                                    }
                                }
                            }
                        );
                    }

                    res.json({ message: "Book Deleted" });
                }
            );
        }
    );
});

app.listen(3000, () =>{console.log("Server running on port 3000");});