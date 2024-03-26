const {Products, Categories, Tables, Reviews} = require('../../models');
const logger = require('../logger/logger');

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
            };
        };
        res.status(200).json(product);
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "request has failed",
            error: error.message
        });
    };
};
exports.products = async (req, res)=> {
    const {le, q, category, from, to} = req.query;
    const name = `name_${le}` || `name_am`;
    try{
        const products = await Products.findAll({
            include: [Categories, Reviews],
        });
        if(!products){
            throw {
                status: 204,
            };
        };
        const search = Object.values(products).filter(product =>{
            if(category !== undefined && category !== product.Category[name]){
                return false;
            };
            if(q !== undefined && product[name].search(new RegExp(q, 'i')) === -1){
                return false;
            };
            return true
        });
        if(search.length === 0){
            throw {
                status: 204,
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
        logger(req.url, error.status? error.status: 400, error);
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
            };
        };
        res.status(200).json(categories);
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
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
            };
        };
        res.status(200).json(tables);
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "reques has failed",
            error: error.message
        });
    };
};