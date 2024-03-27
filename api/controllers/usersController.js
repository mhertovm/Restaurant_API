const {Users, Carts, Favorites, Orders, Reviews, Bookings} = require('../../models');
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger');

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
        logger(req.url, error.status? error.status: 400, error);
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
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
};
exports.ordersBought = async (req, res)=> {
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
                        where: {buy : true}
                    },
                },
            ]
        });
        const ordersBought = user.Cart.Orders;
        if(!ordersBought) {
            throw {
                status: 204,
            };
        };
        res.status(200).json({
            ordersBought,
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
};
exports.bookings = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    try{
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
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
};
exports.favorites = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    try{
        const user = await Users.findOne({
            where: {email: decoded.email},
            include: Favorites
        });
        const favorites = user.Favorites;
        if(!favorites) {
            throw {
                status: 204,
            };
        };
        res.status(200).json({
            favorites,
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
};
exports.reviews = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    try{
        const user = await Users.findOne({
            where: {email: decoded.email},
            include: Reviews
        });
        const reviews = user.Reviews;
        if(!reviews) {
            throw {
                status: 204,
            };
        };
        res.status(200).json({
            reviews,
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to request",
            error: error.message
        });
    };
};
exports.addOrder = async (req, res)=> {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const {product_id, quantity} = req.body;
    try{
        if(quantity > 5 || quantity < 1){
            throw {
                message: "less than 1 and more than 5 products cannot be add cart"
            };
        };
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
                buy: 0
            }
        });
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
        logger(req.url, error.status? error.status: 400, error);
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
    try{
        const from = Date.UTC(fromYear, fromMonth, fromDay, fromHour);
        const to = Date.UTC(toYear, toMonth, toDay, toHour);
        const date = new Date();
        const now_utc = Date.UTC(
            date.getUTCFullYear(), 
            date.getUTCMonth(),
            date.getUTCDate(), 
            date.getUTCHours()
        );
        if((to - from) < 3600000 || (to - from) > 24 * 36000000 || from < now_utc){
            throw {
                message: "less than 1 and more than 24 hour and in past tense cannot be booked"
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
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: "failed to add booking",
            error: error.message
        });
    };
};
exports.addFavorite = async (req, res)=> {
    const {product_id} = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    try{
        const user = await Users.findOne({
            where: {email: decoded.email},
            include: Favorites
        });
        const favorite = await Favorites.findOne({
            where: {
                user_id: user.id,
                product_id: product_id
            }
        });
        if(favorite){
            throw {
                status: 400,
                message: 'favorite there exists'
            };
        };
        const addFavorite = await Favorites.create({
            user_id: user.id,
            product_id,
        });
        res.status(201).json({
            message: "favorite added",
            addFavorite
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: "failed to add favorite",
            error: error.message
        });
    }
};
exports.addReview = async (req, res)=> {
    const {rating, comment, product_id} = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    try{
        if(rating > 5 || rating < 1){
            throw {
                message: "less than 1 and more than 5 cannot be accepted"
            };
        };
        const user = await Users.findOne({
            where: {email: decoded.email},
        });
        const reviews = await Reviews.findOne({
            where: {
                user_id: user.id,
                product_id: product_id,
            }
        });
        if(reviews){
            throw {
                status: 400,
                message: 'reviews there exists'
            };
        };
        const addReview = await Reviews.create({
            user_id: user.id,
            product_id,
            rating: Math.floor(rating),
            comment
        });
        res.status(201).json({
            message: "reviews added",
            addReview
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: "failed to add reaviews",
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
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to update order",
            error: error.message
        });
    };
};
exports.payment = async (req, res)=> {
    const id = req.params.id;
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const bankRespons = "ok"
    try{
        if(bankRespons !== "ok"){
            throw {
                message: "payment has not been made"
            }
        };
        const user = await Users.findOne({
            where: {email: decoded.email},
            include: Carts
        });
        const order = await Orders.findOne({
            where: {
                id: id,
                cart_id: user.Cart.id,
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
                buy: true
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'order has been paid',
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to buy order",
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
        const date = new Date();
        const now_utc = Date.UTC(
            date.getUTCFullYear(), 
            date.getUTCMonth(),
            date.getUTCDate(), 
            date.getUTCHours()
        );
        if((to - from) < 3600000 || (to - from) > 24 * 36000000 || from < now_utc){
            throw {
                message: "less than 1 and more than 24 hour and in past tense cannot be booked"
            };
        };
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
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to update booking",
            error: error.message
        });
    };
};
exports.updateReview = async (req, res)=> {
    const id = req.params.id;
    const {rating, comment} = req.body;
    try{
        if(rating > 5 || rating < 1){
            throw {
                message: "less than 1 and more than 5 cannot be accepted"
            };
        };
        const reaview = await Reviews.findOne({
            where: {
                id: id
            }
        });
        if(!reaview){
            throw {
                status: 404,
                message: 'review not found'
            };
        };
        Reviews.update(
            {
                rating: rating? Math.floor(rating) : reaview.rating,
                comment: comment? comment : reaview.comment
            },
            {where: {id: id}}
        );
        res.status(200).json({
            message: 'order updated',
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(error.status? error.status : 400).json({
            message: "failed to update order",
            error: error.message
        });
    };
}
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
        logger(req.url, error.status? error.status: 400, error);
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
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: 'failed to delete booking',
            error: error.message
        });
    };
};
exports.deleteFavorite = async (req, res)=> {
    const id = req.params.id;
    try{
        Favorites.destroy({
            where: {
                id: id,
            }
        });
        res.status(200).json({
            message: 'favorite deleted'
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: 'failed to delete favorite',
            error: error.message
        });
    };
};
exports.deleteReview = async (req, res)=> {
    const id = req.params.id;
    try{
        Reviews.destroy({
            where: {
                id: id,
            }
        });
        res.status(200).json({
            message: 'reviews deleted'
        });
    } catch(error){
        logger(req.url, error.status? error.status: 400, error);
        res.status(400).json({
            message: 'failed to delete reviews',
            error: error.message
        });
    };
};