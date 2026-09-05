# 🏠 EasyRent

EasyRent is a full-stack property rental management application that connects renters, property owners, and administrators.

## 🚀 Features

- User registration and JWT authentication
- Role-based access: Renter, Owner, Admin
- Property listing and management
- Property booking management
- Image upload
- Admin dashboard

## 🛠️ Tech Stack

**Frontend:** React.js, Bootstrap, Axios  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Authentication:** JWT, bcrypt  
**DevOps:** Docker, Docker Compose, Kubernetes, Terraform, Jenkins  
**Cloud:** AWS

## 📁 Project Structure

EasyRent/
├── backend/
├── frontend/
├── infra/
├── k8s/
├── docker-compose.yaml
├── Jenkinsfile
└── .gitignore

▶️ Run Locally
Backend
cd backend
npm install
npm start
Frontend
cd frontend
npm install
npm start

Frontend: http://localhost:3000
Backend: http://localhost:5000

🐳 Docker
docker compose up --build
☸️ Kubernetes

Kubernetes manifests are available in the k8s/ directory.

kubectl apply -f k8s/
🏗️ Terraform

Infrastructure configuration is available in infra/.

cd infra
terraform init
terraform validate
terraform plan
terraform apply
🔄 CI/CD

Jenkins is configured to automate the application build, containerization, and deployment workflow.

GitHub → Jenkins → Docker → AWS ECR → Kubernetes/EKS
👨‍💻 Author

Lokesh Kalyampudi

A personal project for practicing Full-Stack Development, AWS, Docker, Kubernetes, Terraform, and CI/CD.


**This is the version I'd recommend for your GitHub repo** — enough information to understand the project without making the README unnecessarily huge.