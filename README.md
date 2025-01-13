# School Payment and Dashboard Application

## **Project Overview**
The School Payment and Dashboard application is a full-stack project designed to manage students, fees, and payment transactions. It consists of a backend service (using Node.js with NestJS and MongoDB) and a frontend interface (using React.js). The application provides APIs for transaction management and a dashboard for viewing and interacting with the data.

---

## **Features**

### **Backend Features**
1. **API Endpoints**:
   - Fetch all transactions.
   - Fetch transactions by school.
   - Check the status of a transaction by `custom_order_id`.
   - Webhook for status updates.
   - Manual status updates.
2. **JWT Authentication** to secure all APIs.
3. **MongoDB Integration** for storing and retrieving transaction data.

### **Frontend Features**
1. Dashboard with paginated and searchable transaction lists.
2. Filters for transaction status and date range.
3. Page to display transactions for a specific `school_id`.
4. Form to check the status of a transaction using `custom_order_id`.
5. Responsive and styled using Tailwind CSS.

---

## **Backend Setup**

### **Prerequisites**
1. Node.js (v16+)
2. MongoDB instance
3. Postman (optional, for testing APIs)

### **Steps to Set Up Backend**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```

4. Seed the database with transactions:
   ```bash
   node seedTransactions.js
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

6. Test APIs using Postman or any API testing tool.

### **API Endpoints**

#### **1. Fetch All Transactions**
- **URL**: `/api/transactions`
- **Method**: `GET`
- **Query Parameters**: (Optional)
  - `status`: Filter by transaction status (e.g., `completed`, `pending`).
- **Response**:
  ```json
  [
    {
      "collect_id": "12345",
      "school_id": "SCH001",
      "gateway": "PayPal",
      "order_amount": 1000,
      "transaction_amount": 950,
      "status": "completed",
      "custom_order_id": "ORD56789"
    }
  ]
  ```

#### **2. Fetch Transactions by School**
- **URL**: `/api/transactions/school/:school_id`
- **Method**: `GET`
- **Path Parameter**: `school_id`
- **Response**:
  ```json
  [
    {
      "collect_id": "12345",
      "school_id": "SCH001",
      "gateway": "PayPal",
      "order_amount": 1000,
      "transaction_amount": 950,
      "status": "completed",
      "custom_order_id": "ORD56789"
    }
  ]
  ```

#### **3. Check Transaction Status**
- **URL**: `/api/transactions/status/:custom_order_id`
- **Method**: `GET`
- **Path Parameter**: `custom_order_id`
- **Response**:
  ```json
  {
    "custom_order_id": "ORD56789",
    "status": "completed"
  }
  ```

#### **4. Webhook for Status Updates**
- **URL**: `/api/transactions/webhook`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "custom_order_id": "ORD56789",
    "status": "failed"
  }
  ```
- **Response**: Status updated.

#### **5. Manual Status Update**
- **URL**: `/api/transactions/manual-update`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "custom_order_id": "ORD56789",
    "status": "completed"
  }
  ```
- **Response**: Status updated.

---

## **Frontend Setup**

### **Steps to Set Up Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### **Core Pages**
1. **Transaction List**:
   - Paginated, searchable, and filterable.
   - API: `/transactions`

2. **School Transactions**:
   - Displays transactions for a selected school.
   - API: `/transactions/school/:school_id`

3. **Transaction Status**:
   - Form to check status by `custom_order_id`.
   - API: `/transactions/status/:custom_order_id`

---

## **Deployment**

### **Backend Deployment**
1. Push code to GitHub.
2. Deploy to a cloud platform (e.g., Heroku, AWS, or Render).
3. Configure environment variables on the platform.
4. Verify APIs are accessible via a public URL.

### **Frontend Deployment**
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to a static hosting platform (e.g., Vercel, Netlify).

---

## **GitHub Repository**
Push the entire project to GitHub with the following structure:

```
project/
├── backend/
├── frontend/
└── README.md
```

---

## **Assessment Notes**
- Ensure all APIs are functional and secure.
- Maintain clean and modular code.
- Provide appropriate error handling and logging.
- Write clear and concise documentation for setup and usage.
- Use version control effectively (Git).

---

## **Contact**
For any queries, please contact the project maintainer.

