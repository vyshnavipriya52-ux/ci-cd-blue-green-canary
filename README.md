# Enterprise CI/CD Pipeline using GitHub Actions, Docker & Kubernetes

## Project Overview

This project demonstrates an enterprise-level CI/CD pipeline built using **GitHub Actions**, **Docker**, and **Kubernetes (K3s)** on **AWS EC2**. The pipeline automates application build, testing, Docker image creation, deployment, and release management using **Canary** and **Blue-Green Deployment** strategies with automatic rollback.

---

## Technologies Used

- GitHub Actions
- Docker
- Kubernetes (K3s)
- AWS EC2
- Linux
- SSH
- Docker Hub

---

## Pipeline Workflow

### 1. Build & Test
- Triggered on every push to the `main` branch.
- Checks out the source code.
- Installs Node.js dependencies.
- Executes automated tests.

---

### 2. Docker Build & Push
- Builds the Docker image.
- Tags the image using the Git commit SHA.
- Pushes both versioned and latest images to Docker Hub.

---

### 3. Deploy to Staging (Blue Environment)
- Connects securely to the AWS EC2 instance using SSH.
- Updates the Kubernetes Blue deployment.
- Verifies the deployment status.

---

### 4. Canary Deployment
- Deploys the new application version to the Canary environment.
- Simulates a **90% Blue / 10% Canary** traffic split.
- Validates the deployment before production.

---

### 5. Manual Approval
- Uses GitHub Environment Protection Rules.
- Waits for manual approval before promoting the release to production.

---

### 6. Blue-Green Deployment
- Scales up the Green deployment.
- Scales down the Blue deployment.
- Verifies that all Kubernetes pods are healthy before completing deployment.

---

### 7. Automatic Rollback
If the production deployment fails:

- Blue deployment is restored.
- Green deployment is scaled down.
- Service availability is maintained.

---

## Deployment Flow

```
Developer
     │
     ▼
GitHub Push
     │
     ▼
GitHub Actions
     │
     ▼
Build & Test
     │
     ▼
Docker Build
     │
     ▼
Push Image to Docker Hub
     │
     ▼
Deploy Blue (Staging)
     │
     ▼
Canary Deployment (10%)
     │
     ▼
Manual Approval
     │
     ▼
Blue-Green Deployment
     │
     ▼
Production
     │
     ▼
Rollback (If Failure)
```

---

## GitHub Actions Jobs

| Job | Purpose |
|------|---------|
| build-test | Builds the application and executes automated tests |
| docker-build | Builds Docker image and pushes it to Docker Hub |
| deploy-staging | Deploys the stable Blue environment |
| deploy-canary | Deploys the Canary version for validation |
| approval | Waits for manual production approval |
| deploy-production | Performs Blue-Green deployment |
| rollback | Restores the previous stable version if deployment fails |

---

## GitHub Secrets Used

The workflow uses GitHub Secrets to securely store sensitive credentials.

- DOCKER_USERNAME
- DOCKER_PASSWORD
- EC2_HOST
- EC2_USER
- EC2_SSH_KEY

---

## Features

- Automated CI/CD Pipeline
- Docker Image Versioning
- Kubernetes Deployment
- Blue-Green Deployment
- Canary Deployment
- Manual Production Approval
- Automatic Rollback
- Secure SSH Deployment
- GitHub Secrets Management

---

## Repository Structure

```
.github/
└── workflows/
    └── enterprise-ci-cd.yml

Dockerfile
package.json
k8s/
README.md
```

---

## Future Enhancements

- Deploy using Helm Charts
- Integrate SonarQube Code Analysis
- Add Trivy Image Scanning
- Integrate Prometheus & Grafana Monitoring
- Slack or Microsoft Teams Notifications
- Multi-Environment Deployment (Dev, QA, Stage, Production)

---

## Author

**Rachamadugu Vyshnavi Priya**

DevOps Engineer

LinkedIn: https://www.linkedin.com/in/rachamadugu-vyshnavi-priya

GitHub: https://github.com/vyshnavipriya52-ux
