FROM python:3.8.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD ./requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

ADD . .

EXPOSE 8000

CMD uvicorn osrs.app:app --host=0.0.0.0 --port=${PORT:-8000}