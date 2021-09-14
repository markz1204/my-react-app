pipeline {
    agent any
    environment { 
        CI = 'true'
        registry = "zyl1204/my-react-app" 
        registryCredential = 'dockerhub-login'
        dockerImage = '' 
    }
    
    options {
        skipDefaultCheckout(true)
    }
    
    stages {
        stage('Checkout'){
            steps {
                script{
                    
                    echo 'Pulling... git-branch : ' + env.GIT_BRANCH
                    echo 'Pulling... env-branch : ' + env.BRANCH_NAME
                    echo 'Pulling... scm-branch : ' + scm.branches[0].name

                    /*
                    if(commitHash.isEmpty()){
                        commitHash = 'main'
                    }
                    */
                    
                    checkout([$class: 'GitSCM', branches: [[name: scm.branches[0].name]], userRemoteConfigs: [[url: 'https://github.com/markz1204/my-react-app.git']]])
                        
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
            steps {
                script { 
                    withDockerRegistry(credentialsId: registryCredential) {
                        sh  'docker push $registry:$BUILD_NUMBER'
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
          steps{
            sh "docker rmi $registry:$BUILD_NUMBER"
            sh "docker rmi my-react-app:latest"
    
          }
        }
        stage('Deliver') { 
            steps {
                echo '"this is a post action area"'
            }
        }
    }
}