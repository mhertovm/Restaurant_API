const {Categories, Products, Tables} = require('../../models');
const fs = require('fs');
const uploadImage = require('../middlewares/upload');
const logger = require('../logger/logger');

exports.addCategory = async (req, res)=>{
    const {name_am, name_en} = req.body;
    try{
        const category = await Categories.create({
            name_am, name_en
        });
        res.status(201).json({
            message: "category added",
            category
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: "failed to add category",
            error: error.message
        });
    };
};
exports.addProduct = async (req, res)=> {
    const {category_id, name_am, name_en, description_am, description_en, price, quantity, discount, image} = req.body;
    try{
        imageUrl = `/image/${image}`
        const product = await Products.create({
            category_id,
            name_am,
            name_en,
            description_am,
            description_en,
            price,
            quantity,
            discount,
            image: imageUrl,
        });
        res.status(201).json({
            message: "product added",
            product
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: "failed to add product",
            error: error.message
        });
    };
};
exports.addTable = async (req, res)=> {
    const {table_number} = req.body;
    try{
        const table = await Tables.create({
            table_number
        });
        res.status(201).json({
            message: 'table added',
            table
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: "failed to add table",
            error: error.message
        });
    };
};
exports.upload = (req, res)=> {
    try{
        if(!req.file){
            throw {
                status: 404,
                message: "file not found"
            }
        }
        res.status(200).json(req.file)
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to upload file",
            error: error.message
        });
    };
};
exports.updateCategory = async (req, res)=> {
    const id = req.params.id
    const {name_am, name_en} = req.body;
    try{
        const category = await Categories.findOne({
            where: {id: id}
        });
        if(!category) {
            throw {
                status: 404,
                message: "category not found",
            };
        };
        const categoryUpdate = await Categories.update(
            {
                name_am: name_am? name_am : category.name_am,
                name_en: name_en? name_en : category.name_en
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'category updated',
            categoryUpdate
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to update category",
            error: error.message
        }); 
    };
};
exports.updateProduct = async (req, res)=> {
    const id = req.params.id;
    const {category_id, name_am, name_en, description_am, description_en, price, quantity, discount, image} = req.body;
    try{
        const product = await Products.findOne({
            where: {id: id},
        });
        if(!product){
            throw {
                status: 404,
                message: "product not found",
            };
        };
        const productUpdate = await Products.update(
            {
                category_id: category_id? category_id : product.category_id,
                name_am: name_am? name_am : product.name_am,
                name_en: name_en? name_en : product.name_en,
                description_am: description_am? description_am : product.description_am,
                description_en: description_en? description_en : product.description_en,
                price: price? price : product.price,
                quantity: quantity? quantity : product.quantity,
                discount: discount? discount : product.discount,
                image: image? image : product.image
            },
            {
                where: {id: id},
            }
        );
        res.status(200).json({
            message: 'Product updated',
            productUpdate
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to update product",
            error: error.message
        });
    };
};
exports.updateTable = async (req, res)=> {
    const id = req.params.id;
    const {table_number} = req.body;
    try{
        const table = await Tables.findOne({
            where: {id: id}
        });
        if(!table){
            throw {
                status: 404,
                message: 'table not found'
            };
        }
        const tableUpdate = await Tables.update(
            {
                table_number: table_number? table_number : table.table_number
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'table updated',
            tableUpdate
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to update table",
            error: error.message
        });
    };
};
exports.deleteCategory = async (req, res)=> {
    const id = req.params.id;
    try{
        const categoryDelete = await Categories.destroy({
            where: {id: id}
        });
        res.status(200).json({
            message: 'category deleted',
            categoryDelete
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: "failed to delete category",
            error: error.message
        });
    };
};
exports.deleteProduct = async (req, res)=> {
    const id = req.params.id;
    try{
        const product = await Products.findOne({
            where: {id: id}
        });
        if(!product){
            throw {
                status: 404,
                message: "product not found",
            };
        };
        if(product.image){
            const imagePath = `./api/public${product.image}`;
            fs.unlink(imagePath, (error)=>{
                console.log(error)
            });
        };
        const productDelete = await Products.destroy({
            where: {id: id}
        });
        res.status(200).json({
            message: 'product deleted',
            productDelete
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: 'failed to delete product',
            error: error.message
        });
    };
};
exports.deleteTable = async (req, res)=> {
    const id = req.params.id;
    try{
        const tableDelete = await Tables.destroy({
            where: {id: id}
        });
        res.status(200).json({
            message: 'table deleted',
            tableDelete
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: 'failed to delete table',
            error: error.message
        });
    };
};