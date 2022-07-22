If by python venv

Do `python3 -m venv .env to create virtualenv`
Then do `source .env/bin/activate to activate virtualenv`
Then do `pip install -r requirements.txt` to install all python dependencies

Or we can do Dockerfile to create a docker image
`docker compose run web django-admin startproject djangott6`
`docker compose build`
`docker compose up`