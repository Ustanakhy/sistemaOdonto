const express = require("express");
const router = express.Router();
const Busboy = require('busboy');
const aws = require('../services/aws');
const Arquivo = require("../models/Arquivo");

const Servico = require("../models/Servico");

router.post("/", async (req, res) => {
    let busboy = new Busboy({ headers: req.headers })
    busboy.on('finish', async () => {
        try {
            const { clinicaId, servico } = req.body
            let errors = []
            let arquivos = []

            
/*
            if (req.files && Object.keys(req.files).length > 0) {
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key];

                    const nameParts = file.name.split('.');
                    const fileName = `${new Date().getTime}.${nameParts[nameParts.length - 1]}`;
                    const path = `servicos/${clinicaId}/${fileName}`;
                    const response = await aws.uploadToS3(file, path)

                    if (response.error) {
                        errors.push({ error: true, message: response.message })
                    } else {
                        arquivos.push(path);
                    }
                }
            } */
            if(errors.length > 0){
                res.json(errors[0])
                return false
            }

            let jsonServico = JSON.parse(Servico)
            const servicoCadastrado = await Servico(jsonServico).save();


            //criar arquivo
            arquivos = arquivos.map(arquivo =>({
                referencialId:servicoCadastrado._id ,
                model:'Servico',
                caminho:arquivo
            }))

            await Arquivo.insertMany(arquivos)
            res.json({servico:servicoCadastrado, arquivos})

        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    });
    req.pipe(busboy);
});


router.put("/:id", async (req, res) => {
    let busboy = new Busboy({ headers: req.headers })
    busboy.on('finish', async () => {
        try {
            const { clinicaId, servico } = req.body
            let errors = []
            let arquivos = []

            if (req.files && Object.keys(req.files).length > 0) {
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key];

                    const nameParts = file.name.split('.');
                    const fileName = `${new Date().getTime}.${nameParts[nameParts.length - 1]}`;
                    const path = `servicos/${clinicaId}/${fileName}`;
                    const response = await aws.uploadToS3(file, path)

                    if (response.error) {
                        errors.push({ error: true, message: response.message })
                    } else {
                        arquivos.push(path);
                    }
                }
            }
            if(errors.length > 0){
                res.json(errors[0])
                return false
            }
             const jsonServico = JSON.parse(servico)
             await Servico.findByIdAndUpdate(req.params.id, jsonServico)


            //criar arquivo
            arquivos = arquivos.map(arquivo =>({
                referencialId:req.params.id ,
                model:'Servico',
                caminho:arquivo
            }))

            await Arquivo.insertMany(arquivos)
            res.json({error:false})

        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    });
    req.pipe(busboy);
});

router.get('/clinica/clinicaId', async (req, res)=>{
    try{
        let servicosClinica = [];
        const servicos = await Servico.find({
            clinicaId: req.params.clinicaId, 
            status: {$ne: 'E'},

        });
        for(let servico of servicos){
            const arquivos = await Arquivo.find({
                model: 'Servico',
                referencialId: servico._id
            })
            servicosClinica.push({...servico._doc, arquivos})
        }
        res.json({
            servicos: servicosClinica
        })
    }
    catch(err){
        res.json({error:true, message: err.message})
    }
})

router.post('/delete-arquivo/:id', async (req,res)=>{
    try{
        const {id} = req.body;

        //excluir aws
        await aws.deleteFileS3(id);
        await Arquivo.findOneAndDelete({
            caminho: id,
        })
        res.json({error: false})

    }catch(err){
        res.json({error:true, message:err.message})
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        await Servico.findByIdAndUpdate(id, {status: 'E'})
    }catch(err){
        res.json({error:true, message:err.message})
    }
})

module.exports = router;
