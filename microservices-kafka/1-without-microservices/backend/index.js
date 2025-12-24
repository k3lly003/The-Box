import express from "express";
import cors from "cors";
import { createOrder, pay, sendEmail, logAnalytics } from "./db.js";
import { authMiddleware } from "./middleware/auth.js";
import { connectDB, closeDB } from "./config/database.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Initialize database connection
let server;

const startServer = async () => {
  try {
    await connectDB();
    
    app.post("/order", authMiddleware, async (req, res) => {
      try {
        const { cart } = req.body;
        const userId = req.userId;

        const paymentResult = await pay(cart, userId);
        await logAnalytics({ cart, userId }, "Payment successful");
        const orderId = await createOrder(cart, userId);
        await logAnalytics({ orderId, userId }, "Order created");
        const emailResult = await sendEmail(orderId, userId);
        await logAnalytics({ orderId, userId, emailResult }, "Email sent");

        return res.json({ orderId, paymentResult, emailResult });
      } catch (error) {
        console.error('Order processing error:', error);
        return res.status(500).json({ error: error.message });
      }
    });

    app.use((err, req, res, next) => {
      console.error('Global error handler:', err);
      return res.status(err.status || 500).json({ error: err.message });
    });

    server = app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down gracefully');
      if (server) {
        server.close();
      }
      await closeDB();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, shutting down gracefully');
      if (server) {
        server.close();
      }
      await closeDB();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
