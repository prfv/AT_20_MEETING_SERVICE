pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                sh 'echo Hello World'
                sh 'echo Hello Class'
            }
        }
        stage('Test') {
            steps{
                ss 'echo Second stage'
            }
        }
    } 
}