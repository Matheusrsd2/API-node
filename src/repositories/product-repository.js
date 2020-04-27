const Produto = require('../app/models/product');

exports.get = async () => {
    const products = await Produto.find();
    
    const total = await Produto.count();

    return {products, total};
}

exports.getById = async (id) => {
    const res = await Produto.findById(id);
    return res;
}

exports.post = async(data) =>{
    const product = new Produto(data);
    await product.save();
}

exports.put = async(id, data) =>{
    await Produto.findByIdAndUpdate(id, {
        $set:{
            nome: data.nome,
            preco: data.preco,
            descricao:data.descricao
        }
    });
}

exports.delete = async(id) =>{
    await Produto.findOneAndRemove(id);
}
