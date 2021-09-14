pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment { 
        CI = 'true'
    }
    stages {
        stage('Checkout'){
            steps {
                script{
                    if(commitHash.isEmpty()){
                        git branch: 'main', credentialsId: 'github', url: 'https://github.com/markz1204/my-react-app.git'
                    }
                    else{
                        checkout([$class: 'GitSCM', branches: [[name: commitHash ]], userRemoteConfigs: [[url: 'https://github.com/markz1204/my-react-app.git']]])
                    }    
                }
                
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test -- --coverage --watchAll=false'
            }
        }
        stage('Deliver') { 
            steps {
                echo '"this is a post action area"'
            }
        }
    }
}