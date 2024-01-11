const Netwealth = require('../models/netwealth');

const createNetwealth = async(input)=>{
    const date = input.date;
    const saving = input.saving;
    const demat = input.demat;
    const stock = input.stock;
    const userEmail = input.userEmail
    const total = saving+demat+stock;
    
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

module.exports = {createNetwealth}