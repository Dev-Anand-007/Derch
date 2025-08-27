const userModel=require('../models/user-model')
const productModel=require('../models/product-model')

const orderController={
    async fetchAllOrder(req,res){
        try {
            // Fetch all users with orders field populated with product details
            const usersWithOrders = await userModel.find({ 
                orders: { $exists: true, $ne: [] } // Only users who have orders
            })
            .populate({
                path: 'orders',
                populate: {
                    path: 'product', // Assuming orders array contains objects with product field
                    model: 'Product', // Replace with your actual product model name
                    select: 'name price image description' // Select fields you need
                }
            })
            .select('name email orders createdAt') // Select user fields you need
            .sort({ createdAt: -1 }); // Sort users by latest created

            // Alternative: If you want to sort by latest order date instead
            // .sort({ 'orders.createdAt': -1 });

            if (!usersWithOrders || usersWithOrders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                count: usersWithOrders.length,
                users: usersWithOrders
            });

        } catch (error) {
            console.error("Fetch orders error:", error);
            
            return res.status(500).json({
                success: false,
                message: "Failed to fetch orders",
                error: error.message
            });
        }

    },

    async fetchUserOrder(req,res){
        try {
            let user=await userModel.findOne({email:req.user.email}).populate('orders','-image');
            

            if (!user ) {
                return res.status(404).json({
                    success: false,
                    message: "No User Found"
                });
            }
            let orders=user.orders || [];


            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                count: orders.length,
               orders:orders
            });

        } catch (error) {
            console.error("Fetch orders error:", error);
            
            return res.status(500).json({
                success: false,
                message: "Failed to fetch orders",
                error: error.message
            });
        }

    },

    async addOrder(req,res){
        try {
            // Fetch all users with orders field populated with product details
            const usersWithOrders = await userModel.find({ 
                orders: { $exists: true, $ne: [] } // Only users who have orders
            })
            .populate({
                path: 'orders',
                populate: {
                    path: 'product', // Assuming orders array contains objects with product field
                    model: 'Product', // Replace with your actual product model name
                    select: 'name price image description' // Select fields you need
                }
            })
            .select('name email orders createdAt') // Select user fields you need
            .sort({ createdAt: -1 }); // Sort users by latest created

            // Alternative: If you want to sort by latest order date instead
            // .sort({ 'orders.createdAt': -1 });

            if (!usersWithOrders || usersWithOrders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                count: usersWithOrders.length,
                users: usersWithOrders
            });

        } catch (error) {
            console.error("Fetch orders error:", error);
            
            return res.status(500).json({
                success: false,
                message: "Failed to fetch orders",
                error: error.message
            });
        }

    },
}

module.exports=orderController;