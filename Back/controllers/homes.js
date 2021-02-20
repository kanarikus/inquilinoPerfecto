const path = require("path");
const db = require("../db/mysql");
const jwt = require("jsonwebtoken");
const fsPromises = require('fs').promises
const uuid = require('uuid');

const sharp = require("sharp")

const {homeValidator} = require('../validators/homeval')

const createHome = async (req, res) => {
  const { authorization } = req.headers;
  const decodedToken = jwt.verify(authorization,process.env.SECRET)
  const id_usuario= await db.getUser(decodedToken.email)
  const {
    fecha_publicacion,
    direccion,
    provincia,
    ciudad,
    precio,
    m2,
    habitaciones,
    baños,
    garaje,
    jardin,
    ascensor,
    balcon
  } = req.body;
  try {
    //const decodedToken = jwt.verify(authorization, process.env.SECRET);
    //const id_usuario = await db.getUser(decodedToken.id)

    await homeValidator.validateAsync(req.body)

    await db.createHome(
      fecha_publicacion,
      direccion,
      provincia,
      ciudad,
      precio,
      m2,
      habitaciones,
      baños,
      id_usuario.id,
      garaje,
      jardin,
      ascensor,
      balcon
    );

  } catch (e) {
    console.log(e)
    let statusCode = 400;
    if (e.message === "database-error") {
      statusCode = 500;
    }
    res.status(statusCode).send(e.message);
    return;
  }
  res.send();
};

const getlistOfHomes = async(req,res) => {
  try {
    let homes = await db.listHomes()
    res.send(homes)
  }catch(e) {
    res.status(500).send
  }
}


const searchHomes = async (req, res) => {
  const {direccion,provincia,ciudad,precio1,precio2,fecha_entrada,fecha_salida,m2,habitaciones,baños,garaje,ascensor,balcon,jardin,direction,order} =req.query
  try {
    let homes = await db.search(direccion,provincia,ciudad,precio1,precio2,fecha_entrada,fecha_salida,m2,habitaciones,baños,garaje,ascensor,balcon,jardin,direction,order);
    res.send(homes);
  } catch (e) {
    console.log(e)
    res.status(500).send();
  }
};

const getHome = async (req, res) => {
    const { id } = req.params

    try {
        const home = await db.getHome(id)

        if (!home.length) {
            res.status(404).send()
        } else {
            res.send(home)
        }
    } catch (e) {
        res.status(500).send()
    }
}

const userHomes = async(req,res) => {
  const {id} = req.params
  try {
    const homes = await db.myHomes(id)
    if(!homes.length) {
      res.status(404).send()
    }else{
      res.send(homes)
    }
  }catch(e) {
    res.status(500).send()
    console.log(e)
  }
}

const deleteHome = async(req,res) => {
    const {id} = req.params

    try{
        const home = await db.getHome(id)

        if(!home.length) {
            res.status(404).send()
            return
        }

        await db.deleteHome(id)

        res.send()
    } catch(e) {
        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}

const updateHome = async(req,res) => {
    const {
        direccion,
        provincia,
        ciudad,
        precio,
        m2,
        habitaciones,
        baños,
        id_usuario
      } = req.body;
    const{id} = req.params
    try{
        //await homeValidator.validateAsync(req.body)
        await db.updateHomeQ(direccion,provincia,ciudad,precio,m2,habitaciones,baños,id_usuario,id)
    } catch(e) {
        let statusCode = 400;
    
        if (e.message === 'database-error') {
            statusCode = 500
        }

        res.status(statusCode).send(e.message)
        return
    }

    res.send()
}


const SaveHomeImage = async(req,res)=> {
  const {id} = req.params
  await fsPromises.mkdir(process.env.TARGET_FOLDER,{recursive:true})
    try{
        const fileID = uuid.v4()
        const outputFileName = `${process.env.TARGET_FOLDER}/${fileID}.jpg`
        await fsPromises.writeFile(outputFileName,req.files.imagen.data)
        await db.saveHomeImageQ(fileID,id)
        res.send()  
    }catch(e){
        console.log('Error: ', e)
        res.status(500).send()
    }
}

// const processAndSaveImage =async (uploadedImage) =>{
//   await fsPromises.mkdir(process.env.TARGET_FOLDER,{recursive:true})
//   console.log(uploadedImage.data)
// try{
//   const image = sharp(uploadedImage.data)
//   const imageInfo=await image.metadata()
//   if(imageInfo.width>1000) {
//     image.resize(1000)
//   }
//   const imageFileName = `${uuid.v4()}`
//   await image.toFile(path.join(imageUploadPath,imageFileName))
//   return imageFilename

// }catch(e){
//   console.log(e)
// } 
//}

module.exports = {
  createHome,
  deleteHome,
  getHome,
  getlistOfHomes,
  //processAndSaveImage,
  updateHome,
  userHomes,
  SaveHomeImage,
  searchHomes
};
