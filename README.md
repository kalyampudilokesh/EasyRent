# 🏠 EasyRent

EasyRent is a full-stack property rental management application that connects renters, property owners, and administrators.

## 🚀 Features

- User registration and login
- JWT authentication
- Role-based access: Renter, Owner, Admin
- Property listing and management
- Property booking
- Image upload
- Admin dashboard

## 🛠️ Tech Stack

- **Frontend:** React.js, Bootstrap, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT, bcrypt
- **DevOps:** Docker, Kubernetes, Terraform, Jenkins
- **Cloud:** AWS

## 📁 Project Structure

```text
EasyRent/
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
```

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🐳 Docker

Run the application using Docker Compose:

```bash
docker compose up --build
```

Stop the containers:

```bash
docker compose down
```

## ☸️ Kubernetes

Kubernetes manifests are available in the `k8s/` directory.

```bash
kubectl apply -f k8s/
```

## 🏗️ Terraform

Infrastructure configuration is available in the `infra/` directory.

```bash
cd infra
terraform init
terraform validate
terraform plan
terraform apply
```

## 🔄 CI/CD

Jenkins is configured for the application build, containerization, and deployment workflow.

```text
GitHub → Jenkins → Docker → AWS ECR → Kubernetes/EKS
```

## 👨‍💻 Author

**Lokesh Kalyampudi**
**Lokesh Kalyampudi**

A personal project for practicing Full-Stack Development, AWS, Docker, Kubernetes, Terraform, and CI/CD.
