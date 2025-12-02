pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/fidakacem/todo-pipeline.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t todo-app .'
            }
        }
    }
}
