require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');

async function runApiTests() {
  console.log('🚀 Running Comprehensive End-to-End API Test Suite...\n');

  const connectDB = require('./config/db');
  await connectDB();

  const express = require('express');
  const cors = require('cors');
  const path = require('path');

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Mount all routes
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/restaurants', require('./routes/restaurantRoutes'));
  app.use('/api/categories', require('./routes/categoryRoutes'));
  app.use('/api/products', require('./routes/productRoutes'));
  app.use('/api/search', require('./routes/searchRoutes'));
  app.use('/api/cart', require('./routes/cartRoutes'));
  app.use('/api/orders', require('./routes/orderRoutes'));
  app.use('/api/payment', require('./routes/paymentRoutes'));
  app.use('/api/coupons', require('./routes/couponRoutes'));
  app.use('/api/address', require('./routes/addressRoutes'));
  app.use('/api/notifications', require('./routes/notificationRoutes'));
  app.use('/api/reviews', require('./routes/reviewRoutes'));
  app.use('/api/favorites', require('./routes/favoriteRoutes'));
  app.use('/api/profile', require('./routes/profileRoutes'));
  app.use('/api/chat', require('./routes/chatRoutes'));
  app.use('/api/upload', require('./routes/uploadRoutes'));
  app.use('/api/admin', require('./routes/adminRoutes'));
  app.use('/api/admin', require('./routes/adminAuthRoutes'));
  app.use('/api/analytics', require('./routes/analyticsRoutes'));
  app.use('/api/otp', require('./routes/otpRoutes'));
  app.use('/api/verification', require('./routes/verificationRoutes'));
  app.use('/api/tracking', require('./routes/trackingRoutes'));
  app.use('/api/push', require('./routes/pushRoutes'));
  app.use('/api/stripe', require('./routes/stripeRoutes'));

  app.get('/', (req, res) => res.json({ success: true, app: 'Food Delivery Backend API' }));

  const server = http.createServer(app);
  const TEST_PORT = 5098;
  
  await new Promise(resolve => server.listen(TEST_PORT, resolve));
  console.log(`📡 Test server listening on http://localhost:${TEST_PORT}\n`);

  async function request(method, reqPath, body = null, token = null) {
    return new Promise((resolve) => {
      const payload = body ? JSON.stringify(body) : null;
      const headers = {
        'Content-Type': 'application/json',
      };
      if (payload) {
        headers['Content-Length'] = Buffer.byteLength(payload);
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const req = http.request(
        {
          hostname: 'localhost',
          port: TEST_PORT,
          path: reqPath,
          method,
          headers,
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            let json;
            try {
              json = JSON.parse(data);
            } catch {
              json = data;
            }
            resolve({ status: res.statusCode, body: json });
          });
        }
      );

      req.on('error', (err) => resolve({ status: 500, error: err.message }));
      if (payload) req.write(payload);
      req.end();
    });
  }

  const results = [];
  function record(name, passed, details = '') {
    results.push({ name, passed, details });
    const mark = passed ? '✅' : '❌';
    console.log(`${mark} ${name}: ${passed ? 'PASSED' : 'FAILED'} ${details ? '(' + details + ')' : ''}`);
  }

  const User = require('./models/User');
  const Address = require('./models/Address');
  const testEmail = `testuser_${Date.now()}@example.com`;
  const adminEmail = `adminuser_${Date.now()}@example.com`;

  try {
    // 1. Root
    const rootRes = await request('GET', '/');
    record('GET / (Root Health)', rootRes.status === 200, `status: ${rootRes.status}`);

    // 2. User Register
    const regRes = await request('POST', '/api/auth/register', {
      name: 'Test Customer',
      email: testEmail,
      password: 'Password123!',
      phone: '1234567890',
    });
    record('POST /api/auth/register', regRes.status === 201 || regRes.status === 200, `status: ${regRes.status}`);
    let userToken = regRes.body && regRes.body.token ? regRes.body.token : null;

    // 3. User Login
    const loginRes = await request('POST', '/api/auth/login', {
      email: testEmail,
      password: 'Password123!',
    });
    record('POST /api/auth/login', loginRes.status === 200, `status: ${loginRes.status}`);
    if (!userToken && loginRes.body && loginRes.body.token) userToken = loginRes.body.token;

    // 4. User Profile (Protected)
    const profRes = await request('GET', '/api/auth/profile', null, userToken);
    record('GET /api/auth/profile', profRes.status === 200, `status: ${profRes.status}`);

    // 5. Admin Register & Analytics test
    const adminUser = await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: 'AdminPassword123!',
      role: 'admin',
    });
    const generateToken = require('./utils/generateToken');
    const adminToken = generateToken(adminUser._id);

    const anaRes = await request('GET', '/api/analytics', null, adminToken);
    record('GET /api/analytics (Admin)', anaRes.status === 200, `status: ${anaRes.status}`);

    // 6. Restaurants
    const restRes = await request('GET', '/api/restaurants');
    record('GET /api/restaurants', restRes.status === 200, `status: ${restRes.status}`);

    const restFeat = await request('GET', '/api/restaurants/featured');
    record('GET /api/restaurants/featured', restFeat.status === 200, `status: ${restFeat.status}`);

    const restPop = await request('GET', '/api/restaurants/popular');
    record('GET /api/restaurants/popular', restPop.status === 200, `status: ${restPop.status}`);

    // 7. Products
    const prodRes = await request('GET', '/api/products');
    record('GET /api/products', prodRes.status === 200, `status: ${prodRes.status}`);

    const catRes = await request('GET', '/api/categories/Nigiri');
    record('GET /api/categories/:category', catRes.status === 200, `status: ${catRes.status}`);

    // 8. Search
    const searchRes = await request('GET', '/api/search?q=Salmon');
    record('GET /api/search', searchRes.status === 200, `status: ${searchRes.status}`);

    // 9. Address (Protected)
    const addrPost = await request('POST', '/api/address', {
      fullName: 'Test User',
      phone: '03001234567',
      addressLine: '123 Sushi Way, Floor 2',
      city: 'Tokyo',
      state: 'Tokyo',
      postalCode: '100-0001',
      addressType: 'Home',
    }, userToken);
    record('POST /api/address (Protected)', addrPost.status === 201 || addrPost.status === 200, `status: ${addrPost.status}`);

    const addrGet = await request('GET', '/api/address', null, userToken);
    record('GET /api/address (Protected)', addrGet.status === 200, `status: ${addrGet.status}`);

    // 10. Favorites (Protected)
    const favGet = await request('GET', '/api/favorites', null, userToken);
    record('GET /api/favorites (Protected)', favGet.status === 200, `status: ${favGet.status}`);

    // 11. Cart (Protected)
    const cartGet = await request('GET', '/api/cart', null, userToken);
    record('GET /api/cart (Protected)', cartGet.status === 200, `status: ${cartGet.status}`);

    // 12. Orders (Protected)
    const ordGet = await request('GET', '/api/orders', null, userToken);
    record('GET /api/orders (Protected)', ordGet.status === 200, `status: ${ordGet.status}`);

    // 13. Stripe Payment Intent
    const stripeRes = await request('POST', '/api/stripe/payment-intent', {
      amount: 45.00,
    });
    record('POST /api/stripe/payment-intent', stripeRes.status === 200, `status: ${stripeRes.status}, clientSecret: ${!!(stripeRes.body && stripeRes.body.clientSecret)}`);

    // 14. Reviews for a restaurant
    const dummyRestaurantId = new mongoose.Types.ObjectId();
    const revGet = await request('GET', `/api/reviews/${dummyRestaurantId}`);
    record('GET /api/reviews/:restaurantId', revGet.status === 200, `status: ${revGet.status}`);

    // 15. Coupons
    const coupGet = await request('GET', '/api/coupons');
    record('GET /api/coupons', coupGet.status === 200, `status: ${coupGet.status}`);

    // 16. Notifications (Protected)
    const notifGet = await request('GET', '/api/notifications', null, userToken);
    record('GET /api/notifications (Protected)', notifGet.status === 200, `status: ${notifGet.status}`);

    // 17. Tracking
    const dummyOrderId = new mongoose.Types.ObjectId();
    const trackGet = await request('GET', `/api/tracking/${dummyOrderId}`, null, userToken);
    record('GET /api/tracking/:orderId (Protected)', trackGet.status === 200 || trackGet.status === 404, `status: ${trackGet.status}`);

    // Cleanup test data
    await User.deleteMany({ email: { $in: [testEmail, adminEmail] } });
    await Address.deleteMany({ fullName: 'Test User' });
  } finally {
    server.close();
    await mongoose.disconnect();
  }

  console.log('\n========================================');
  const passedCount = results.filter(r => r.passed).length;
  console.log(`📊 Final Result: ${passedCount}/${results.length} API Tests Passed!`);
  console.log('========================================');
}

runApiTests();
