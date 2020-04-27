const User = require('../app/models/user');
const repository = require("../repositories/user-repository");
const fs = require('fs');

exports.post = async (req, res) => {

    try {
        await repository.post({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).send({
            message: "Usuário inserido com sucesso"
        })
        var log = { 
            email: req.body.email, 
            password: req.body.password 
        };

        fs.appendFile('users.json', JSON.stringify(log), err => {
            console.log(err);
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao inserir um usuário",
            erro: error
        });

    }
}

exports.getAll = async (req, res) => {
    try {
        var data = await repository.get();
        var  qtdUser = await User.count();
        
        res.status(200).send({
            data: data,
            QuantidadeDeUsuarios: qtdUser
        })
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            erro: error
        })
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.userId;
        const data = await repository.getById(id);
        res.status(200).send(data);
    } catch (error){
        if (data == null ){
            res.status(400).json({
            message: "Usuário não encontrado! Verifique se o ID é válido!"
        });
    } else {
        res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }
    } 
}

exports.put = async (req, res) => {
    try {
        const id = req.params.userId;    
        const data = await repository.put(id, req.body);
        res.status(200).send({
            message:"Usuário atualizado com sucesso",
            dados: data
        })
    } catch (error) {
         res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }
}

exports.delete = async (req, res) =>{
    try {
        const id = req.params.userId;  
        await repository.delete(id);
        res.status(200).send({
            message:"Usuário removido com sucesso",
        })
    } catch (error) {
         res.status(500).send({
            message: "Falha na requisição",
            erro: error
        });
    }
};

exports.login = async (req, res) => {
    var { email, password } = req.body;
  
    try {
      const user = await repository.login(email, password);
  
      if (!user) 
        return res.status(400).json({
        message: 'E-mail ou senha inválidos'
      });
  
      res.status(200).json(user);
    } catch(err) {
      res.status(500).send({
          message: "Falha na autenticação",
          erro: error
      });
    }
  };
