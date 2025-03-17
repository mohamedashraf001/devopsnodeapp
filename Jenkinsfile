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
                withDockerRegistry([credentialsId: '1ab44ec4-3008-4141-aac7-32ada3869c24', url: '']) {
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }

           stage('Deploy') {
            steps {
                sh 'echo "Deploying application..."'
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

