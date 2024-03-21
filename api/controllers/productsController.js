const {Products, Categories, Tables, Reviews} = require('../../models')

exports.oneProduct = async (req, res)=> {
    const id = req.params.id;
    try{
        const product = await Products.findAll({
            where: {id: id},
            include: [Categories, Reviews]
        });
        if(!product){
            throw {
                status: 204,
                message: 'product not founde'
            };
        };
        res.status(200).json(product);
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "request has failed",
            error: error.message
        });
    };
};
exports.products = async (req, res)=> {
    const {name, category, from, to} = req.query;
    try{
        const products = await Products.findAll({
            include: [Categories, Reviews],
        });
        if(!products){
            throw {
                status: 204,
                message: 'products not founde'
            };
        };
        const search = Object.values(products).filter(product =>{
            if(category !== undefined && category !== product.Category.name_en){
                return false;
            };
            if(name !== undefined && product.name_en.search(new RegExp(name, 'i')) === -1){
                return false;
            };
            return true
        });
        if(search.length === 0){
            throw {
                status: 204,
                message: `product whose category: ${category}, name: ${name}, not founde`
            };
        };
        let results;
        if(from === undefined && to === undefined){
            results = search;
        } else{
            results = search.slice(from-1, to < search.length? to : search.length-1);
        };
        res.status(200).json({
            length: search.length,
            results
        });
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "request has failed",
            error: error.message
        });
    };
};
exports.categories = async (req, res)=> {
    try{
        const categories = await Categories.findAll();
        if(!categories){
            throw {
                status: 204,
                message: 'tables not found'
            };
        };
        res.status(200).json(categories);
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "reques has failed",
            error: error.message
        });
    };
};
exports.tables = async (req, res)=> {
    try{
        const tables = await Tables.findAll();
        if(!tables){
            throw {
                status: 204,
                message: 'tables not found'
            };
        };
        res.status(200).json(tables);
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "reques has failed",
            error: error.message
        });
    };
};