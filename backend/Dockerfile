FROM python:3.9.13

WORKDIR /var/jenkins_home/workspace/AIDeploy/backend
COPY requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .

RUN python manage.py migrate
RUN python manage.py collectstatic
RUN python db_uploader.py
CMD ["gunicorn", "zzikmuk.wsgi", "--bind", "0.0.0.0:8080"]