# 🚀 EasyRent – Full Stack App with Production-Grade DevOps Pipeline

## 📌 Overview

EasyRent is a full-stack application deployed using a complete DevOps pipeline on AWS EKS.
The project demonstrates CI/CD automation, containerization, Kubernetes orchestration, and full observability (monitoring, logging, alerts).

---

## 🏗️ Architecture

```
Developer → GitHub → Jenkins CI/CD → Docker → DockerHub → AWS EKS → Kubernetes Pods
                                                        ↓
                                              Prometheus + Grafana
                                                        ↓
                                                    Loki Logs
```

---

## ⚙️ Tech Stack

### 🖥️ Application

* Backend: Node.js
* Frontend: React

### ☁️ Cloud & Infrastructure

* AWS EKS (Kubernetes)
* EC2 (Jenkins server)

### 🔁 CI/CD

* Jenkins (Pipeline as Code)
* GitHub Webhooks

### 📦 Containerization

* Docker
* DockerHub

### ☸️ Orchestration

* Kubernetes (Deployments, Services, Ingress)

### 📊 Observability

* Prometheus (Metrics)
* Grafana (Dashboards)
* Loki (Logging)
* Alertmanager (Alerts)

### 🔐 Security

* Trivy (Container Image Scanning)
* Kubernetes Secrets

---

## 🚀 Features

* ✅ Automated CI/CD pipeline using Jenkins
* ✅ Docker image build and push to DockerHub
* ✅ Deployment to AWS EKS Kubernetes cluster
* ✅ Security scanning using Trivy
* ✅ Monitoring with Prometheus & Grafana
* ✅ Centralized logging using Loki
* ✅ Alerting for CPU usage and pod failures
* ✅ Scalable microservices architecture

---

## 🔄 CI/CD Pipeline Flow

1. Code pushed to GitHub
2. Webhook triggers Jenkins pipeline
3. Jenkins stages:

   * Checkout code
   * Build Docker images
   * Run tests
   * Security scan (Trivy)
   * Push images to DockerHub
   * Deploy to EKS using kubectl
4. Kubernetes updates pods automatically

---

## 📊 Monitoring & Logging

### 📈 Grafana Dashboards

* Kubernetes Nodes
* Pods CPU & Memory usage
* Application performance

### 📜 Logs (Loki)

* Centralized logs for backend & frontend
* Real-time debugging without kubectl logs

### 🚨 Alerts

* High CPU usage
* Pod restarts
* Application failures

---

## 🧪 How to Run

### 1️⃣ Clone Repo

```
git clone https://github.com/kalyampudilokesh/EasyRent.git
```

### 2️⃣ Deploy to Kubernetes

```
kubectl apply -f code/k8s/
```

### 3️⃣ Access Application

```
kubectl get svc -n easyrent
```

---

## 🔐 Environment Variables

Secrets are managed using Kubernetes Secrets (not stored in Git).

---

## 🖼️ Screenshots

* Jenkins Pipeline
  <img width="1896" height="944" alt="image" src="https://github.com/user-attachments/assets/025c622f-5479-43ff-8f5b-f305c1b70eaa" />
* Grafana Dashboard
  <img width="1911" height="940" alt="image" src="https://github.com/user-attachments/assets/53aac478-8d6a-430e-976d-55205ed33df1" />
  <img width="1900" height="936" alt="image" src="https://github.com/user-attachments/assets/74084071-166f-420b-9af2-09e3e4e23e50" />

---

## 🧠Key Learnings

* Built a production-grade CI/CD pipeline
* Hands-on experience with AWS EKS and Kubernetes
* Implemented observability (metrics, logs, alerts)
* Debugged real-world DevOps issues (Docker, IAM, kubectl, pipelines)

---

## 🚀 Future Improvements

* 🔁 Versioned deployments (v1, v2)
* 📦 Helm charts for packaging
* 🔄 GitOps using ArgoCD
* 🔐 AWS Secrets Manager integration

---

## 👨‍💻 Author

Lokesh Kalyampudi
