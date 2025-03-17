pipeline {
    agent any

    environment {
        IMAGE_NAME = "mohamedashraf001/dockernodeapp:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/mohamedashraf001/devopsnodeapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Logging into Docker Hub and pushing the image..."
                withDockerRegistry([credentialsId: 'ac543826-0d86-4ece-b196-c111d70e3b99', url: '']) {
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Checking if deployment exists..."
                    def deploymentExists = sh(script: "kubectl get deployment dockernodedepolyment --ignore-not-found -o jsonpath='{.metadata.name}'", returnStdout: true).trim()

                    if (!deploymentExists) {
                        echo "Creating new deployment..."
                        sh "kubectl create deployment dockernodedepolyment --image=$IMAGE_NAME"
                    } else {
                        echo "Updating existing deployment..."
                        sh "kubectl set image deployment/dockernodedepolyment dockernodedepolyment=$IMAGE_NAME --record"
                        sh "kubectl rollout status deployment/dockernodedepolyment"
                    }

                    echo "Checking if service exists..."
                    def serviceExists = sh(script: "kubectl get service dockernodeservice --ignore-not-found -o jsonpath='{.metadata.name}'", returnStdout: true).trim()
                    
                    if (!serviceExists) {
                        echo "Exposing deployment as a service..."
                        sh "kubectl expose deployment dockernodedepolyment --name=dockernodeservice --type=LoadBalancer --port=3000"
                    }

                    echo "Fetching services status..."
                    sh 'kubectl get services'
                }
            }
        }
    }
}

// pipeline {
//     agent any
//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/mohamedashraf001/devopsnodeapp.git'
//             }
//         }
//         stage('Build') {
//             steps {
//                 sh 'echo "Building the application..."'
//             }
//         }
//         stage('Test') {
//             steps {
//                 sh 'echo "Running tests..."'
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 sh 'echo "Deploying application..."'
//             }
//         }
//     }
// }

