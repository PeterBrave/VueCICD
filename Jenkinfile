/*Setting variables*/
def environment_docker_name = 'npm-image'            // The name of slave image
def tag_environment_docker_name = "zxpwin/npm-image" //The tag of slave image, zxpwin stands for the name of docker hub


/*Setup the environment of the slave*/
/*
podTemplate(
    containers: [containerTemplate(name: 'environment', image: 'docker', ttyEnabled: true, command: 'cat')], 
    volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')],
	namespace: 'kube-jenkins',
	nodeSelector: "ip-172-26-14-103.ap-northeast-2.compute.internal"
){
    node(POD_LABEL) {
    	container('environment') {
        stage("Environment setup"){
	    /*Dockerfile*/
        sh 'echo "FROM centos \n RUN yum update -y && yum install -y git && yum install gcc gcc-c++ && yum install -y wget && wget https://npm.taobao.org/mirrors/node/v10.13.0/node-v10.13.0.tar.gz && tar xvf node-v10.13.0.tar.gz && cd node-v10.13.0/ && ./configure && make  && make install " > Dockerfile'


	    /*Build docker*/
	    sh "docker build -t ${environment_docker_name} ."
	    /*Tag image*/
            sh "docker tag ${environment_docker_name} ${tag_environment_docker_name}"
	    /*Login the docker hub and push image to the hub*/
            withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                sh "docker login -u ${dockerHubUser} -p ${dockerHubPassword}"
                sh "docker push ${tag_environment_docker_name}"
            }
            sh "rm -rf Dockerfile"
        }
    	}
	}
}
*/
podTemplate(
    containers: [containerTemplate(name: 'npm', image: "${tag_environment_docker_name}", ttyEnabled: true, command: 'cat')], 
    //volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')],
	volumes: [hostPathVolume(hostPath: '/root/data/', mountPath: '/root/data/')],
	namespace: 'kube-jenkins',
	nodeSelector: "ip-172-26-14-103.ap-northeast-2.compute.internal"
){
    node(POD_LABEL) {
        container('npm') {
	   /*Clone code form github*/
            stage('Clone') {
                git clone -b new-ui https://github.com/PeterBrave/VueCICD.git
            }
            /*Build project*/
            stage('Build'){
               sh "npm install"    
               sh "npm run build"
               sh "cp -r /home/jenkins/agent/* /root/npmdata/"
            }
	}
    }
}
