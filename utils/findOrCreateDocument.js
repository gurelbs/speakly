const Document = require('./../modules/Document')

async function findOrCreateDoc(id,defaultData){
    if (!id) return
    const doc = await Document.findById(id)
    if (doc) return doc
    return await Document.create({_id: id, data:defaultData}) 
}

module.exports = findOrCreateDoc