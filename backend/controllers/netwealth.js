const Netwealth = require('../models/netwealth');

const createNetwealth = async(input)=>{
    const date = input.date;
    const saving = input.saving;
    const demat = input.demat;
    const stock = input.stock;
    const userEmail = input.userEmail
    const total = saving+demat+stock;

    const isExist = await Netwealth.find({userEmail:userEmail,date:date});
    if(isExist.length>0){
        console.log(isExist)
        return "There is already a entry by for this date please update that"
    }

    const newNetwealth = await Netwealth.create({
        date : date,
        saving : saving,
        demat : demat,
        stock : stock,
        total : total,
        userEmail : userEmail
    })
    return newNetwealth;
}

const getAllNetwealth = async(input)=>{
    const allNetwealth = await Netwealth.find({userEmail: input.userEmail});
    return allNetwealth
}

const updateNetwelath = async(input,id,email)=>{
    try{
        const netwealth = await Netwealth.findById(id);
        if(netwealth.userEmail!=email){
            return "unauthorised to edit this expense"
        }
        const updatedNetwealth = await Netwealth.findOneAndReplace({_id:id},input,{new:true,returnOriginal: false});
        return updatedNetwealth;
        }
    catch(error){
        return error;
    }
}

const deleteNetwealth = async(id,email)=>{
    try{
        const netwealth = await Netwealth.findById(id);
        if(netwealth.userEmail!=email){
            return "unauthorised to delete this expense";
        }
        const deletedNetwealth = await Netwealth.findByIdAndDelete(id);
        return deletedNetwealth;
    }
    catch(error){
        return error;
    }
}

module.exports = {createNetwealth,getAllNetwealth,updateNetwelath,deleteNetwealth}