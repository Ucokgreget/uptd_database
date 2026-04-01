const Pegawai = require("../models/pegawaiModel");
const {createCustomError} = require("../error/custom-error")

const getPegawai = async(req,res) => {
    try{
        const pegawai = await Pegawai.find();
        res.status(200).json(pegawai)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const createPegawai = async(req, res) => {
    try{
        const {nama, nip, jabatan, unitKerja, email, noTelp} = req.body;

        const pegawai = new Pegawai({nama, nip, jabatan, unitKerja, email, noTelp})
        
        const savePegawai = await pegawai.save();
        res.status(200).json(savePegawai);
    }
    catch(error){
        return res.status(400).json(error)
    }
}

const getPegawaiById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const pegawai = await Pegawai.findOne({_id:id});

        if(!pegawai){
            return createCustomError(`no data with id:${id}`, 404)
        }
        res.status(200).json(pegawai)
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
    
}

const deletePegawai = async (req, res, next) => {
    try{
        const {id} = req.params;
        const deletedPegawai = await Pegawai.findOneAndDelete({_id:id});
        if(!deletedPegawai){
            return createCustomError(`no data with id:${id}`, 404)
        }
        res.status(200).json({message: "Data berhasil dihapus"})
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

const updatePegawai = async(req,res,next) =>{
    try{
            const {id} = req.params
    const {nama, nip, jabatan, unitKeja, email, noTelp} = req.body;

    const updatedPegawai = await Pegawai.findOneAndUpdate(
        {_id:id},
        {nama, nip, jabatan, unitKeja, email, noTelp},
        {
            new:true,
            runValidators:true
        }
    )
    if(!updatePegawai){
        return createCustomError(`no data with id:${id}`, 404)
    }

    res.status(200).json(updatedPegawai)
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getPegawai,
    createPegawai,
    getPegawaiById,
    deletePegawai,
    updatePegawai
}