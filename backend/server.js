import express, { json } from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const db = createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: '',
});

db.connect((error) => {
    if (error) {
        console.log("Error while connecting database mysql", error);
    } else {
        console.log("Successfully connected to database");
    }
});

app.post('/signup', (req, res) => {
    const { full_name, email, pass } = req.body;
    const query = 'INSERT INTO signupform (full_name, email, pass) VALUES (?, ?, ?)';
    db.query(query, [full_name, email, pass], (error, result) => {
        if (error) {
            console.error('Error in inserting data:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        } else {
            console.log('Data inserted successfully');
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`)
});
