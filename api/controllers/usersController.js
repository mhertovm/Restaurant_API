const {Users, Carts, Favorites, Orders, Reviews, Bookings} = require('../../models');
const jwt = require('jsonwebtoken');

exports.user = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    try{
        const user = await Users.findOne({
            where: {email: decoded.email},
            include:[
                {
                    model: Carts,
                    include: {
                        model: Orders
                    }
                },
                Favorites,
            ]
        });
        if(!user) {
            throw {
                status: 404,
                message: "User not found",
            };
        };
        const orders = Object.values(user.Cart.Orders).filter((order) => {
            if(order.buy !== false){
                return false;
            }
            return true;
        });
        res.status(200).json({
            id: user.id,
            name: user.name,
            surname: user.surname,
            gender: user.gender,
            age: user.age,
            phone: user.phone,
            email: user.email,
            role: user.role,
            cart_id: user.Cart.id,
            discount: user.Cart.discount,
            orders: orders,
            favorites: user.Favorites,
        });
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
};
exports.orders = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    try{
        const user = await Users.findOne({
            where: {email: decoded.email},
            include:[
                {
                    model: Carts,
                    include: {
                        model: Orders,
                        where: {buy : false}
                    },
                },
            ]
        });
        const orders = user.Cart.Orders
        if(!orders) {
            throw {
                status: 204,
            };
        };
        res.status(200).json({
            orders,
        });
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
};
exports.bookings = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    console.log(decoded)
    try{
        const decoded = jwt.decode(token);
        const user = await Users.findOne({
            where: {email: decoded.email},
            include: Bookings
        });
        const bookings = user.Bookings
        if(!bookings) {
            throw {
                status: 204,
            };
        };
        res.status(200).json({
            bookings
        });
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
}
exports.addOrder = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const {product_id, quantity} = req.body;
    try{
        const user = await Users.findOne({
            where: {
                email: decoded.email,
            },
            include: Carts
        });
        const order = await Orders.findOne({
            where: {
                cart_id: user.Cart.id,
                product_id,
                quantity,
                buy: 1
            }
        })
        if(order){
            throw {
                status: 400,
                message: 'order there exists'
            };
        };
        const addOrder = await Orders.create({
            cart_id: user.Cart.id,
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
exports.addBooking = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const {table_id, fromYear, fromMonth, fromDay, fromHour, toYear, toMonth, toDay, toHour} = req.body;
    const from = Date.UTC(fromYear, fromMonth, fromDay, fromHour);
    const to = Date.UTC(toYear, toMonth, toDay, toHour);
    try{
        const from = Date.UTC(fromYear, fromMonth, fromDay, fromHour);
        const to = Date.UTC(toYear, toMonth, toDay, toHour);
        if(to - from < 3600000){
            throw {
                status: 400,
                message: "less than one hour cannot be booked"
            };
        };
        const user = await Users.findOne({
            where: {
                email: decoded.email,
            },
            include: Bookings
        });
        const bookings = user.Bookings
        Object.values(bookings).forEach((booking)=> {
            const fromBusy = Date.UTC(booking.fromYear, booking.fromMonth, booking.fromDay, booking.fromHour);
            const toBusy = Date.UTC(booking.toYear, booking.toMonth, booking.toDay, booking.toHour);
            if(fromBusy <= from && from < toBusy || fromBusy < to && to <= toBusy){
                throw {
                    status: 400,
                    message: "busy at that time"
                };
            };
        });
        const addBooking = await Bookings.create({
            user_id : user.id,
            table_id,
            fromYear, 
            fromMonth, 
            fromDay, 
            fromHour, 
            toYear, 
            toMonth, 
            toDay, 
            toHour
        });
        res.status(201).json({
            message: "order added",
            addBooking
        });
    } catch(error){
        res.status(400).json({
            message: "failed to add booking",
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
exports.updateBooking = async (req, res)=> {
    const id = req.params.id;
    const {fromYear, fromMonth, fromDay, fromHour, toYear, toMonth, toDay, toHour} = req.body;
    try{
        const from = Date.UTC(fromYear, fromMonth, fromDay, fromHour);
        const to = Date.UTC(toYear, toMonth, toDay, toHour);
        const booking = await Bookings.findOne({
            where: {id: id}
        });
        if(!booking){
            throw {
                status: 404,
                message: 'booking not found'
            };
        };
        const bookings = await Bookings.findAll({
            where: {
                table_id: booking.table_id
            }
        });
        Object.values(bookings).forEach((booking)=> {
            const fromBusy = Date.UTC(booking.fromYear, booking.fromMonth, booking.fromDay, booking.fromHour);
            const toBusy = Date.UTC(booking.toYear, booking.toMonth, booking.toDay, booking.toHour);
            if(fromBusy <= from && from <= toBusy || fromBusy <= to && to <= toBusy){
                throw {
                    message: "busy at that time"
                };
            };
        });
        Bookings.update(
            {
                Year: fromYear, 
                Month: fromMonth, 
                Day: fromDay, 
                Hour: fromHour, 
                Year: toYear, 
                Month: toMonth, 
                Day: toDay, 
                Hour: toHour
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'order updated',
        });
    } catch(error){
        res.status(error.status? error.status : 400).json({
            message: "failed to update booking",
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
exports.deleteBooking = (req, res)=> {
    const id = req.params.id;
    try{
        Bookings.destroy({
            where: {
                id: id,
            }
        });
        res.status(200).json({
            message: 'booking deleted'
        });
    } catch(error){
        res.status(400).json({
            message: 'failed to delete booking',
            error: error.message
        });
    };
};