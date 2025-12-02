pipeline {
    agent any

        stage('Checkout') {
        steps {
            git branch: 'main', url: 'https://github.com/fidakacem/todo-pipeline.git'
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
