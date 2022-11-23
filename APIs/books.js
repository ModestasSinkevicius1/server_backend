const booksAPI = (app, con) =>{

  app.get('/books', (req, res) => {
      const sql = `
      SELECT * FROM knygos
      `;
      con.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
      });
  })

  app.post('/books', (req, res) => {
    const sql = `
    INSERT INTO knygos (name, author, category, date, image)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.name, req.body.author, req.body.category, req.body.date, req.body.image], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
  })

  app.put('/books/:id', (req, res) => {
    const sql = `
    UPDATE knygos SET name = ?, author = ?, category = ?, date = ?, image = ? WHERE id = ?
    `;
    con.query(sql, [req.body.name, req.body.author, req.body.category, req.body.date, req.body.image, req.params.id], (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })

  app.delete('/books/:id', (req, res) => {
    const sql = `
      DELETE FROM knygos
      WHERE id = ?
      `;
      con.query(sql, [req.params.id], (err, result) => {
          if (err) throw err;
          res.send(result);
      });
  })

}

export { booksAPI };

// READ RELATIONSHIP JOIN(LEFT, RIGHT, INNER)

// app.get("/resource", (req, res) => {
//   const sql = `
//   SELECT itemsA_atr.*, itemB.id AS itemB_id_rename, itemB.post
//   FROM itemsA AS itemsA_rename
//   LEFT JOIN itemsB AS itemsB_rename
//   ON itemsB_rename.itemA_id = itemsA_rename.id
//   ORDER BY itemsA_rename.title
//   `;
//   con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//   });
// });