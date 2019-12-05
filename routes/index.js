var express = require("express");
var router = express.Router();
var xlsx = require("xlsx");

router.get("/", (req,res) => {
    res.render("search");
})

router.get("/results", (req, res) => {
    var wb = xlsx.readFile(__dirname + "/servicio.xlsx");
    var ws = wb.Sheets['Hoja 1'];
    var data = xlsx.utils.sheet_to_json(ws);
    var student = { matricula: req.query.matricula,
                    ciudadano: 0,
                    profesional: 0,
                    proyecto: new Array(),
                    total_acreditar: 0,
                    found: false}; 
    data.forEach((e) => {
        if(e.__EMPTY_2 === req.query.matricula.toUpperCase()){
            student.matricula = e.__EMPTY_2;
            student.ciudadano = e.__EMPTY_10;
            student.profesional = e.__EMPTY_11;
            student.found = true;
        }
    });
    ws = wb.Sheets['Hoja 2'];
    data = xlsx.utils.sheet_to_json(ws);
    data.forEach((e) => {
        if(e.__EMPTY_8 === req.query.matricula){
            student.proyecto.push({proy: e.__EMPTY_2,
                                   horas: e.__EMPTY_17}); 
            student.total_acreditar+=e.__EMPTY_17;
            student.found = true ;
        }
    });
    res.render("results", {alumno: student});
});

module.exports = router;