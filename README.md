# Node.js App Deployment with Docker, Minikube, and CI/CD Pipeline

This project demonstrates the deployment of a Node.js application using Docker and Kubernetes. We have implemented a CI/CD pipeline using GitHub Actions to automate the build, test, and deployment process. The pipeline also sends notifications to Discord regarding the deployment status.

## Approach

1. **Application Setup**:
   - A simple Node.js application serves on port 3000 and responds with a "Hi, better software" message on the root endpoint.
   - The application is containerized using Docker, making it easy to deploy and scale.

2. **Dockerization**:
   - A `Dockerfile` was created to build the Node.js application image, ensuring a consistent environment for deployment across different environments (local, Minikube, etc.).

3. **Kubernetes Deployment**:
   - The application is deployed using Kubernetes with a **Deployment** resource for managing application instances and a **Service** resource of type `NodePort` to expose the application on port `30080`.
   - **Port forwarding** was set up using `kubectl port-forward` to allow access to the application on localhost.

4. **CI/CD Pipeline with GitHub Actions**:
   - The CI/CD pipeline automates the following tasks:
     - **Install dependencies**: `npm install` to install Node.js dependencies.
     - **Run tests**: The tests are executed using `npx jest`.
     - **Build Docker Image**: The Docker image is built and tagged with the latest version.
     - **Minikube Setup**: Minikube is installed and started to simulate a Kubernetes cluster on the local environment.
     - **Deploy to Minikube**: The deployment and service YAML files are applied using `kubectl apply -f`.
     - **Port-forwarding**: `kubectl port-forward` is used to expose the service on the specified port (30080).

5. **Discord Notification**:
   - Notifications for deployment success or failure are sent to a specified Discord channel via a webhook using `curl`.
   - A success message is sent if the deployment process completes without issues. A failure message is sent if any step of the deployment process fails.

## Challenges Faced

1. **Docker Image Configuration**:
   - Initially, setting up the correct environment variables and ensuring the Docker image was built correctly was a bit tricky. The Docker container needed to properly expose port 3000, and ensuring that Kubernetes could map it to an external port required some troubleshooting.

2. **Minikube Setup**:
   - Installing Minikube in the GitHub Actions pipeline caused some issues with dependencies and system configurations. It took time to get Minikube running in the CI environment, especially given that GitHub Actions runners use Ubuntu, which required additional setup steps to run Minikube.

3. **Port-Forwarding Issues**:
   - When port-forwarding using Kubernetes, the correct ports needed to be specified. We initially ran into problems where the service wasn’t correctly forwarding traffic to the right port on the container (e.g., mismatch between `targetPort` and `port` in the service definition).

4. **Kubernetes Configuration**:
   - Configuring Kubernetes resources like Deployment and Service was straightforward, but ensuring the correct service ports and environment variables were mapped properly to match the running app was an iterative process.

5. **Discord Webhook Integration**:
   - Sending notifications to Discord required setting up a webhook URL securely in GitHub Actions as a secret. Debugging the webhook integration was a bit tricky, but it worked once we ensured the correct payload format was used.

## Steps to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sarveshsd/node-app.git
   cd node-app
