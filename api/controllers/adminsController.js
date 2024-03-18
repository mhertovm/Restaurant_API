const {Categories, Products, Tables} = require('../../models');

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
        res.status(400).json({
            message: "failed to add category",
            error: error.message
        });
    };
};
exports.addProduct = async (req, res)=> {
    const {category_id, name_am, name_en, description_am, description_en, price, quantity, discount, image} = req.body;
    try{
        const product = await Products.create({
            category_id,
            name_am,
            name_en,
            description_am,
            description_en,
            price,
            quantity,
            discount,
            image
        });
        res.status(201).json({
            message: "product added",
            product
        });
    } catch(error){
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
        res.status(400).json({
            message: "failed to add table",
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
        Categories.update(
            {
                name_am: name_am? name_am : category.name_am,
                name_en: name_en? name_en : category.name_en
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'category updated',
        });
    } catch(error){
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
        Products.update(
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
        });
    } catch(error){
        console.log(error)
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
        await Tables.update(
            {
                table_number: table_number? table_number : table.table_number
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'table updated',
        });
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "failed to update table",
            error: error.message
        });
    };
};
exports.deleteCategory = (req, res)=> {
    const id = req.params.id;
    try{
        Categories.destroy({
            where: {id: id}
        });
        res.status(200).json({
            message: 'category deleted',
        });
    } catch(error){
        res.status(400).json({
            message: "failed to delete category",
            error: error.message
        });
    };
};
exports.deleteProduct = (req, res)=> {
    const id = req.params.id;
    try{
        Products.destroy({
            where: {id: id}
        });
        res.status(200).json({
            message: 'product deleted'
        });
    } catch(error){
        res.status(400).json({
            message: 'failed to delete product',
            error: error.message
        });
    };
};
exports.deleteTable = (req, res)=> {
    const id = req.params.id;
    try{
        Tables.destroy({
            where: {id: id}
        });
        res.status(200).json({
            message: 'table deleted'
        });
    } catch(error){
        res.status(400).json({
            message: 'failed to delete table',
            error: error.message
        });
    };
};