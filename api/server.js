// SUNUCUYU BU DOSYAYA KURUN
const express = require('express');
const userModel = require('./users/model');

const server = express();

server.use(express.json());

server.get('/api/users', async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({message:"Kullanıcı bilgileri alınamadı"})
    }
});

//CREATE - post
server.post('/api/users', async (req, res) => {
    try {
        const {name, bio} = req.body;
        if(!name || !bio) {
            res.status(400).json({message: "Lütfen kullanıcı için bir name ve bio sağlayın"});
        }else {
            let insetedUser = await userModel.insert({name, bio});
            res.status(201).json(insetedUser);
        }
    } catch (error) {
        res.status(500).json({message: "Veritabanına kaydedilirken bir hata oluştu"})
    }
});

// READ - get
server.get('/api/users/:id', async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if(!user){
            res.status(404).json({message: "Belirtilen ID'li kullanıcı bulunamadı"});
        }else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({message: "Kullanıcı bilgisi alınamadı"})
    }
});


//DELETE - delete
server.delete('/api/users/:id', async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if(!user){
            res.status(404).json({message: "Belirtilen ID li kullanıcı bulunamadı"});
        }else {
            await userModel.remove(req.params.id);
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({message: "Kullanıcı silinemedi"})
    }
});

//UPDATE - put
server.put('/api/users/:id', async(req, res) =>{
    try {
        const {name, bio} = req.body;
        if(!name || !bio){
            res.status(400).json({message: "Lütfen kullanıcı için name ve bio sağlayın"});
        }else {
            const user = await userModel.findById(req.params.id);
            if(!user){
                res.status(404).json({message: "Belirtilen ID'li kullanıcı bulunamadı"});
            }else{
                const updatedUser = await userModel.update(req.params.id,{name:name, bio:bio});
                res.json(updatedUser);
            }
        }
    } catch (error) {
        res.status(500).json({message: "Kullanıcı bilgileri güncellenemedi"});
    }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
