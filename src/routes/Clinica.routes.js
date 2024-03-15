const express = require("express");
const router = express.Router();
const Clinica = require("../models/Clinica");
const Servico = require("../models/Servico");

router.post("/", async (req, res) => {
  try {
    const clinica = await new Clinica(req.body).save();
    res.json({ clinica: clinica });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

router.get("/servicos/:clinicaId", async (req, res) => {
  try {
    const { clinicaId } = req.params;
    const servicos = await Servico.find({
      clinicaId,
      Status: "A"
    }).select("titulo id");

    res.json(
      {
        servicos: servicos.map(s =>
        (
          {
            label: s.titulo,
            value: s._id
          }
        )
        )
      }
    )

  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

router.get('/:id', async (req,res)=>{
  try{
    const clinica = await Clinica.findById(req.params.id).select('capa nome endereco.cidade geo.coordinates')

   /*  const distance  = turf.distance(
      turf.point(salao.geo.coordinates), 
      turf.point()
    );

    res.json({error: false, salao, distance}); */
    res.status(200).json(clinica)

  } 
  catch(err){
    res.json({error:true, message: err.message})
  }
})

module.exports = router;
