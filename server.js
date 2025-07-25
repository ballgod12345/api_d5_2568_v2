const express = require('express')
const app = express()
const cors = require("cors")
const multer = require('multer')
const db = require('./db'); // import จาก db.js
const port = 7000

app.use(cors())
app.use(express.json())

const upload = multer({ dest: 'uploads/' }) // จะเก็บไฟล์ในโฟลเดอร์ uploads/

app.delete('/delete-user/:id',async (req, res) => {
     console.log('data=',req.params)
     const {id} = req.params
     const [result] =await db.execute('DELETE  FROM user WHERE id = ?', [id])  
     res.send({
      status: 'DELETE OK',
      จำนวนDELETE:result.affectedRows
     })
})
app.put('/edit-user/:id',async (req, res) => {
      console.log('data11=',req.params)
     console.log('data=',req.params)
     const {id} = req.params
     const {email,password} = req.body
     const [result] =await db.execute('UPDATE user SET email=?, password=?  WHERE id = ?', [email,password,id])  
     res.send({
      status: 'ok',
      จำนวนUPDATE:result.affectedRows
     })
})

app.post('/add-user',async (req, res) =>  {
   console.log('data=', req.body)
   const {email,password,status,pic} = req.body
   const [result] = await db.execute('INSERT INTO  user (email,password,status,pic) VALUES (?, ?, ?, ?)',[email,password,status,pic])
    res.send({
       id: result.insertId, 
       msg: 'ok' });
})
app.get('/list', async(req, res) => {
const [rows] = await db.query('SELECT * FROM user');
   res.json(rows);
})
app.post('/insert', (req, res) => {
res.status(200).json({
    data: req.body,
    status: 'yes'
   })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
