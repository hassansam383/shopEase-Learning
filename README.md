# 🛒 ShopEase - E-Commerce Microservices Application

A simple e-commerce application built with **Java Spring Boot** microservices backend and **Next.js** frontend.

## Architecture

```
┌─────────────┐
│   Next.js   │  (Port 3000)
│  Frontend   │
└──────┬──────┘
       │
┌──────▼──────┐
│ API Gateway │  (Port 8080)
│ Spring Cloud│
└──────┬──────┘
       │
   ┌───┼───┐
   │   │   │
┌──▼─┐┌▼──┐┌▼───┐
│Prod││Ord ││User │
│ 8081││8082││8083 │
└────┘└────┘└─────┘
```

## Microservices

| Service | Port | Description |
|---------|------|-------------|
| **API Gateway** | 8080 | Routes requests to microservices |
| **Product Service** | 8081 | Manages products (CRUD, search, categories) |
| **Order Service** | 8082 | Manages orders (create, status updates) |
| **User Service** | 8083 | Manages users (registration, profiles) |

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2
- Spring Cloud Gateway
- Spring Data JPA
- H2 Database (in-memory)
- Lombok

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.9+
- Node.js 18+

### Option 1: Run Services Individually

**1. Start Product Service**
```bash
cd ecommerce/backend/product-service
mvn spring-boot:run
```

**2. Start Order Service**
```bash
cd ecommerce/backend/order-service
mvn spring-boot:run
```

**3. Start User Service**
```bash
cd ecommerce/backend/user-service
mvn spring-boot:run
```

**4. Start API Gateway**
```bash
cd ecommerce/backend/api-gateway
mvn spring-boot:run
```

**5. Start Frontend**
```bash
cd ecommerce/frontend
npm install
npm run dev
```

### Option 2: Run with Docker Compose

```bash
cd ecommerce
docker-compose up --build
```

## API Endpoints

### Products (via Gateway: http://localhost:8080)
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?name={name}` - Search products

### Orders (via Gateway: http://localhost:8080)
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/user/{userId}` - Get orders by user
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}/status?status={status}` - Update order status
- `PUT /api/orders/{id}/cancel` - Cancel order

### Users (via Gateway: http://localhost:8080)
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/email/{email}` - Get user by email
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Frontend Pages

- `/` - Product listing
- `/products/{id}` - Product detail with add to cart
- `/cart` - Shopping cart with checkout
- `/orders` - Order history

## Sample Data

The application comes pre-loaded with:
- **8 products** across Electronics, Sports, and Home categories
- **3 users** (2 customers + 1 admin)

