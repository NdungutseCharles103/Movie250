const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
// require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors({
    origin: "*",
}))

app.get('/', (req, res)=> {
    res.send('Welcome to movie250 site')
})

const movieRoute = require('./routes/movieRoute')
app.use('/api/movies', movieRoute)

const newsRoute = require('./routes/newsRoute')
app.use('/api/news', newsRoute)

app.get('/api/movie/:id', (req, res) => {
    const id =req.params.id
   pool.getConnection((err, connection) => {
       if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
          connection.query(`SELECT * from movies WHERE id=${id}`, (err, rows) => {
           connection.release() // return the connection to pool
           if(!err) {
               res.send(rows)
            } else {
               console.log(err)
            }
       })
   })
})

app.post('/api/movie', (req, res)=>{
    const { name , image, tagline, description } = req.body;
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`);
        connection.query(`INSERT INTO movies(name, image, Release_date, Link, status, other) VALUES ("${name}", "${image}", "${tagline}", "${description}")`, (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err);
            }
        })
    })
})

app.delete('/api/movie/:id', (req, res)=>{
    const id = req.params.id
    pool.getConnection((err, connection)=> {
        if(err) throw err
        connection.query(`DELETE from movies WHERE id =${id}`, (err, rows) => {
          connection.release();
          if (!err) {
            res.send(rows);
          } else {
              res.send(err)
          }
        });
    })
})

app.put('/api/movie/:id', (req, res)=>{
    const id =req.params.id
    const { name, image, tagline, description } = req.body;
    pool.getConnection((err, connection)=>{
        if(err) throw err
        connection.query(`UPDATE movies SET name="${name}", image="${image}", tagline="${tagline}", description="${description}" WHERE id=${id}`,
        (err, rows) =>{
            if (!err) {
                res.send(rows);
            } else {
                res.send(err)
            }
        })
    })
})

const PORT = process.env.PORT || 2020
app.listen(PORT, ()=> console.log(`Listening to http://localhost:${PORT}`))