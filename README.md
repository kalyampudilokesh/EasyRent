# 🏠 EasyRent

EasyRent is a full-stack property rental web application that allows users to discover properties, manage listings, make booking requests, and provides administrators with tools to manage users, properties, and bookings.

The project is built using the MERN stack and is being developed with a DevOps-oriented deployment architecture using Docker, Kubernetes, Terraform, Jenkins, and AWS.

---

## 🚀 Features

### 👤 User Management
- User registration and login
- JWT-based authentication
- Role-based access
- Renter and owner functionality
- Protected routes

### 🏡 Property Management
- Owners can add properties
- Upload property images
- View and manage property listings
- Property details and availability

### 📅 Booking Management
- Renters can view properties
- Submit booking requests
- View booking status
- Owners can manage booking requests

### 🛠️ Admin Management
- Manage users
- Manage properties
- Manage bookings
- Administrative dashboard

---

# 🏗️ Application Architecture
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    │   Port: 3000     │
                    └────────┬─────────┘
                             │
                         HTTP/API
                             │
                             ▼
                    ┌──────────────────┐
                    │ Node.js/Express  │
                    │   Port: 5000     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   MongoDB Atlas  │
                    └──────────────────┘

DevOps & Cloud:
Area	Technology
Version Control	Git
Repository	GitHub
Containerization	Docker
Container Orchestration	Kubernetes
Infrastructure as Code	Terraform
CI/CD	Jenkins
Cloud Platform	AWS
Container Registry	AWS ECR
Monitoring	AWS CloudWatch
Load Balancing	AWS Load Balancer

📁 Project Structure:
EasyRent/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── images/
│   │   └── modules/
│   ├── Dockerfile
│   └── package.json
│
├── infra/
│   ├── modules/
│   │   ├── ec2/
│   │   ├── eks/
│   │   └── vpc/
│   ├── backend.tf
│   ├── main.tf
│   ├── outputs.tf
│   ├── provider.tf
│   └── variables.tf
│
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── ingress.yaml
│   ├── namespace.yaml
│   └── secret.yaml
│
├── docker-compose.yaml
├── Jenkinsfile
└── .gitignore



🐳 Running with Docker

Build and start the application using Docker Compose:

docker compose up --build

Check running containers:

docker ps

Stop the application:

docker compose down
💻 Running Locally Without Docker
Backend

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
JWT_SECRET=your_secret
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string

Start the backend:

npm start

The backend runs on:

http://localhost:5000
Frontend

Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the application:

npm start

The frontend runs on:

http://localhost:3000
☸️ Kubernetes

The project includes Kubernetes manifests for deploying the frontend and backend.

Resources include:

Namespace
   │
   ├── Frontend Deployment
   │       └── Frontend Service
   │
   ├── Backend Deployment
   │       └── Backend Service
   │
   ├── Ingress
   │
   └── Secret

Apply the Kubernetes configuration:

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/

Check resources:

kubectl get pods
kubectl get services
kubectl get ingress
🏗️ Terraform

Terraform configuration is located inside:

infra/

The infrastructure is organized into reusable modules:

infra/modules/
├── vpc/
├── ec2/
└── eks/

Initialize Terraform:

cd infra
terraform init

Validate configuration:

terraform validate

Review infrastructure changes:

terraform plan

Apply infrastructure:

terraform apply
🔄 CI/CD

Jenkins is used for automating the application build and deployment workflow.

High-level pipeline:

Developer
    │
    ▼
  GitHub
    │
    ▼
  Jenkins
    │
    ├── Checkout
    ├── Build
    ├── Test
    ├── Docker Build
    ├── Push Image
    │
    ▼
 AWS ECR
    │
    ▼
Kubernetes / AWS
    │
    ▼
 EasyRent

The pipeline configuration is maintained in:

Jenkinsfile
🔐 Security

Sensitive configuration should never be committed to Git.

Do not commit:

.env
MongoDB credentials
JWT secrets
AWS credentials
API keys

Use environment variables, Kubernetes Secrets, AWS IAM, and other appropriate secret-management mechanisms.

🌳 Git Branching Strategy

The project currently uses:

main

main is the default and stable branch.

A development branch can be introduced later when required.

📌 Current DevOps Components

The repository currently contains configuration for:

Docker
Docker Compose
Kubernetes
Terraform
Jenkins
AWS infrastructure
EKS
EC2
VPC

The infrastructure and deployment configuration will continue to evolve as the project moves toward a production-style AWS deployment.

🎯 Project Goals

The main DevOps objectives for EasyRent are:

Containerize the application
Provision AWS infrastructure using Terraform
Deploy workloads using Kubernetes
Implement CI/CD with Jenkins
Store container images in a container registry
Implement secure configuration management
Add monitoring and logging
Improve deployment reliability
Follow Infrastructure as Code practices
👨‍💻 Project

EasyRent – Property Rental Platform

Full-stack application + DevOps implementation.

React.js
    +
Node.js / Express.js
    +
MongoDB
    +
Docker
    +
Kubernetes
    +
Terraform
    +
Jenkins
    +
AWS


📄 License

This project is for learning and development purposes.

I deliberately described the AWS/DevOps parts as **implementation/configuration goals**, rather than claiming everything is already deployed to AWS. That's better for your GitHub README because we can update those sections as we actually complete each stage.
