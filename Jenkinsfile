pipeline {
    agent any
    stages {
        stage('image-build-push') {
            steps {
                script {
                    docker.withRegistry('https://${registry}',
                            registryCredential) {
                        def dockerImage =
                                docker.build("ftms/${moduleName}",
                                        "-f Dockerfile .")
                        dockerImage.push()
                    }
                }

            }
        }
    }
    environment {
        registry = 'registry-vpc.cn-qingdao.aliyuncs.com'
        registryCredential = 'registry-aliyun'
        moduleName = 'ftms-website-pc'
    }
}
