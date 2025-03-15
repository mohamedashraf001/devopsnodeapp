pipeline {
    agent any

    environment {
        IMAGE_NAME = "mohamedashraf001/dockernodeapp:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/mohamedashraf001/devopsnodeapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    def deploymentExists = sh(script: "kubectl get deployment dockernodedepolyment --ignore-not-found -o jsonpath='{.metadata.name}'", returnStdout: true).trim()

                    if (!deploymentExists) {
                        sh 'kubectl create deployment dockernodedepolyment --image=$IMAGE_NAME'
                    } else {
                        sh 'kubectl set image deployment/dockernodedepolyment dockernodedepolyment=$IMAGE_NAME --record'
                        sh 'kubectl rollout status deployment/dockernodedepolyment' // انتظر حتى يتم تحديث البودات
                    }

                    def serviceExists = sh(script: "kubectl get service dockernodeservice --ignore-not-found -o jsonpath='{.metadata.name}'", returnStdout: true).trim()
                    if (!serviceExists) {
                        sh 'kubectl expose deployment dockernodedepolyment --name=dockernodeservice --type=LoadBalancer --port=3000'
                    }

                    sh 'kubectl get services'
                }
            }
        }
    }
}
