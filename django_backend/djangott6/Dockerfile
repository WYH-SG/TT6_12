# Pull base image
FROM python:3.9-alpine3.13

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY ./requirements.txt ./app/
RUN pip install -r ./app/requirements.txt

# Copy project
COPY . /app/
#COPY ./docker-entrypoint.sh /app/
#RUN ["chmod", "+x", "/app/docker-entrypoint.sh"]
#ENTRYPOINT ["/app/docker-entrypoint.sh"]