const {Users, Carts, Favorites, Orders, Reviews, Bookings} = require('../../models');

exports.addOrder = async (req, res)=> {
    const {cart_id, product_id, quantity} = req.body;
    try{
        const order = await Orders.findOne({
            where: {
                cart_id: cart_id,
                product_id: product_id,
                buy: false
            }
        });
        if(order){
            throw {
                status: 400,
                message: 'order there exists'
            };
        };
        const addOrder = await Orders.create({
            cart_id,
            product_id,
            quantity,
        });
        res.status(201).json({
            message: "order added",
            addOrder
        });
    } catch(error){
        res.status(400).json({
            message: "failed to add order",
            error: error.message
        });
    };
};
exports.updateOrder = async (req, res)=> {
    const id = req.params.id;
    const {quantity} = req.body;
    try{
        const order = await Orders.findOne({
            where: {
                id: id,
                buy: false
            }
        });
        if(!order){
            throw {
                status: 404,
                message: 'order not found'
            };
        };
        Orders.update(
            {
                quantity: quantity? quantity : order.quantity
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'order updated',
        });
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "failed to update order",
            error: error.message
        });
    };
};
exports.deleteOrder = (req, res)=> {
    const id = req.params.id;
    try{
        Orders.destroy({
            where: {
                id: id,
                buy: false
            }
        });
        res.status(200).json({
            message: 'order deleted'
        });
    } catch(error){
        res.status(400).json({
            message: 'failed to delete order',
            error: error.message
        });
    };
};