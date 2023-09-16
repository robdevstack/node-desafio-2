const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 3000;

app.listen(PORT, console.log(`servidor encendido en el puerto ${PORT}`))

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    })

app.post("/canciones", (req, res) =>{
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    canciones.push(cancion);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("producto agregado con exito")
})


app.get("/canciones", (req, res)=>{
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    res.send(canciones);
})

app.put("/canciones/:id", (req, res) =>{
    const {id} = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    const index = canciones.findIndex(a => a.id == id)
    canciones[index] = cancion
    fs.writeFileSync("canciones.json",JSON.stringify(canciones));
    res.send("cancion modificada con exito");
})


app.delete("/canciones/:id", (req, res)=>{
    const {id} = req.params;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    const index = canciones.findIndex(a => a.id == id);
    canciones.splice(index,1);
    fs.writeFileSync("canciones.json",JSON.stringify(canciones));
    res.send("cancion borrada con exito");
}) 