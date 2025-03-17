// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "mohamedashraf001/dockernodeapp:latest"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 echo "Checking out code from GitHub..."
//                 git branch: 'main', url: 'https://github.com/mohamedashraf001/devopsnodeapp.git'
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 echo "Building Docker image..."
//                 sh 'docker build -t $IMAGE_NAME .'
//             }
//         }

//         stage('Push Docker Image') {
//             steps {
//                 echo "Logging into Docker Hub and pushing the image..."
//                 withDockerRegistry([credentialsId: '2efc87da-f6d0-4f73-b1fa-bf7a0a36bcc6', url: '']) {
//                     sh 'docker push $IMAGE_NAME'
//                 }
//             }
//         }

//            stage('Deploy') {
//             steps {
//                 sh 'echo "Deploying application..."'
//             }
//         }
//     }
// }


pipeline {
    agent any

    environment {
        IMAGE_NAME = "mohamedashraf001/dockernodeapp:latest"
        CONTAINER_NAME = "node_app"
        APP_PORT = "3000"
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
                withDockerRegistry([credentialsId: '2efc87da-f6d0-4f73-b1fa-bf7a0a36bcc6', url: '']) {
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Stopping old container if exists..."
                    sh 'docker stop $CONTAINER_NAME || true'
                    sh 'docker rm $CONTAINER_NAME || true'

                    echo "Running new container..."
                    sh 'docker run -d --name $CONTAINER_NAME -p $APP_PORT:$APP_PORT $IMAGE_NAME'
                }
            }
        }
    }
}
