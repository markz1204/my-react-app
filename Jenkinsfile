pipeline {
    agent any
    environment {
        CI = 'true'
        registry = 'zyl1204/my-react-app'
        registryCredential = 'dockerhub_login'
        dockerImage = ''
    }

    //skip the default scm checkout
    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    if (commitHash.isEmpty()) {
                        commitHash = 'main'
                    }
                    checkout([$class: 'GitSCM', branches: [[name: commitHash ]], userRemoteConfigs: [[url: 'https://github.com/markz1204/my-react-app.git']]])
                }
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:lts-buster-slim'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:lts-buster-slim'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'npm run test -- --coverage --watchAll=false'
            }
        }
        stage('Dockerise app') {
            steps {
                script {
                    sh 'docker build -t my-react-app:latest .'
                    sh 'docker tag my-react-app $registry:$BUILD_NUMBER'
                }
            }
        }
        stage('Push to docker hub') {
            agent any
            steps {
                script {
                    withDockerRegistry('', registryCredential ) {
                        sh  'docker push $registry:$BUILD_NUMBER'
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
                sh "docker rmi $registry:latest"
            }
        }
        stage('Deliver') {
            steps {
                echo '"this is a post action area"'
            }
        }
    }
}
