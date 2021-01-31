FROM python:3.8.5

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "osrs.app:app"]