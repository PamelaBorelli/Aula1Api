const express = require('express');
const server = express();
server.use(express.json());

// server.get('/curso', (req, res) =>{
//     return res.send('HELLO WORLD');
// });

// server.get('/curso/:id', (req, res) =>{
//     const nome = req.query.nome;
//     const id = req.params.id;

//     return res.json({curso: `${id}`, nome: `Aprendendo ${nome}`});
// });

server.use((req, res, next )=>{
    console.log(`URL CHAMADA: ${req.url}`);

    return next();
})

function checkCurso(req, res, next){
    if(!req.body.novo_curso){
        return res.status(400).json({error:
        "Nome do curso é obrigatório nesse formato {'novo_curso' : 'Lua'}"});
    }
    return next();
}

function checkIDCurso(req, res, next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({ error: "O curso não existe no ID solicitado"});
    }
    return next();
}

server.get('/curso', (req, res)=>{
    return res.json(cursos);
})

const cursos = ['NodeJs', 'Javascript', 'PHP', 'React SHOW', 'VueJs']

server.get('/curso/:index', checkIDCurso, (req, res) =>{
    const { index } = req.params;

    return res.json(cursos[index]);
});

server.post('/curso',checkCurso, (req, res)=>{
    const {novo_curso} = req.body;
    cursos.push(novo_curso);

    return res.json(cursos);

})

server.put('/curso/:index', (req, res)=>{
    const { index } = req.params;
    const { curso } = req.body;

    cursos[index] = curso;

    return res.json(cursos);

})

server.delete('/curso/:index', (req, res)=>{
    const { index } = req.params;
    
    cursos.splice(index, 1);
    return res.json({message: "CURSO DELETEADO COM SUCESSO"})

})

server.listen(3000);

