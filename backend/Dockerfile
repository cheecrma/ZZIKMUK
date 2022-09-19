FROM python:3.9.13

WORKDIR /var/jenkins_home/workspace/AiDeploy/backend

COPY requirements.txt ./


RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . .
