FROM python:3.9.1
WORKDIR /alias
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY FlaskApp/ .
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "-p", "5007"]