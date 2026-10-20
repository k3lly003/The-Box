import { v4 as uuidv4 } from "uuid";
import { getCollection } from "./config/database.js";

export const pay = async (cart, userId) => {
  try {
    const paymentsCollection = getCollection('payments');
    
    const payment = {
      _id: uuidv4(),
      userId,
      cart,
      amount: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await paymentsCollection.insertOne(payment);
    console.log('Payment processed:', result.insertedId);
    
    return "success";
  } catch (error) {
    console.error('Payment error:', error);
    throw new Error('Payment failed');
  }
};

export const createOrder = async (cart, userId) => {
  try {
    const ordersCollection = getCollection('orders');
    
    const order = {
      _id: uuidv4(),
      userId,
      items: cart,
      totalAmount: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await ordersCollection.insertOne(order);
    console.log('Order created:', result.insertedId);
    
    return order._id;
  } catch (error) {
    console.error('Order creation error:', error);
    throw new Error('Order creation failed');
  }
};

export const sendEmail = async (orderId, userId, emailResult) => {
  try {
    const emailsCollection = getCollection('emails');
    
    const email = {
      _id: uuidv4(),
      orderId,
      userId,
      type: 'order_confirmation',
      status: 'sent',
      sentAt: new Date(),
      createdAt: new Date()
    };

    const result = await emailsCollection.insertOne(email);
    console.log('Email sent:', result.insertedId);
    
    return "success";
  } catch (error) {
    console.error('Email error:', error);
    // Uncomment the line below to simulate email failure
    // throw new Error("Email failed");
    return "success";
  }
};

export const logAnalytics = async (data, message) => {
  try {
    const analyticsCollection = getCollection('analytics');
    
    const analytics = {
      _id: uuidv4(),
      message,
      data,
      timestamp: new Date(),
      createdAt: new Date()
    };

    const result = await analyticsCollection.insertOne(analytics);
    console.log("Analytics log created: ", message, result.insertedId);
    
    return "success";
  } catch (error) {
    console.error('Analytics error:', error);
    // Don't throw error for analytics as it shouldn't break the main flow
    return "success";
  }
};