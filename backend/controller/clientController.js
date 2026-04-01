const Client = require("../models/clientModel")
const {createCustomError} = require("../error/custom-error")

const getClient = async(req, res) => {
    try{
        const client = await Client.find();
        res.status(200).json(client)
    }
    catch(error){
        res.status(400).json(error)
    }
}

const createClient = async (req, res) => {
    try{
        const {nama, email, noTelp, alamat} = req.body;

        const client = await new Client({nama, email, noTelp, alamat})

        const savedClient = await client.save();
        res.status(200).json(savedClient);
    }
    catch(error){
        return res.status(400).json(error)
    }
}

const getClientById = async (req, res, next) => {
    const {id} = req.params;
    const client = await Client.findOne({_id:id});

    if(!client){
        return createCustomError(`no data with id:${id}`, 404)
    }
    res.status(200).json(client)
}

const deleteClient = async (req, res, next) => {
    try{
        const {id} = req.params;
        const deletedClient = await Client.findOneAndDelete({_id:id});
        if(!deletedClient){
            return createCustomError(`no data with id:${id}`, 404)
        }
        res.status(200).json({message: "Data berhasil dihapus"})
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

const updateClient = async(req,res,next) =>{
    try{
            const {id} = req.params
    const {nama, email, noTelp, alamat} = req.body;

    const updatedClient = await Client.findOneAndUpdate(
        {_id:id},
        {nama, email, noTelp, alamat},
        {new: true, runValidators: true}
    )

    if(!updatedClient){
        return createCustomError(`no data with id:${id}`, 404)
    }
    res.status(200).json(updatedClient)
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getClient,
    createClient,
    getClientById,
    deleteClient,
    updateClient
}
