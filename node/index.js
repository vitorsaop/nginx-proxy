const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const config = {
    host: 'db',  
    user: 'root',
    password: 'root',
    database: 'desafio'
};

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {

    const insertSql = `INSERT INTO people(name) VALUES ('Teste NGINX')`;
    
    connection.query(insertSql, (error, results) => {
        if (error) {
            console.error('Erro ao inserir no banco de dados:', error);
            return res.status(500).send('Erro ao inserir no banco de dados');
        }
        
        console.log('Registro inserido com sucesso:', results);
        
        const selectSql = `SELECT * FROM people`;
        
        connection.query(selectSql, (error, results) => {
            if (error) {
                console.error('Erro ao buscar no banco de dados:', error);
                return res.status(500).send('Erro ao buscar no banco de dados');
            }
            
            let html = '<h1>Full Cycle</h1><ul>';
            results.forEach(person => {
                html += `<li>${person.name}</li>`;
            });
            html += '</ul>';
            
            res.send(html);
        });
    });    
    
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
    app.listen(port, () => {
        console.log('Rodando na porta ' + port);
    });
});
