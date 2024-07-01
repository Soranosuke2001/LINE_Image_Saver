# Backend - Server

The server will automatically detect uploaded images, videos, audio files and other files and save them to a AWS S3 bucket.

## Getting Started

This README file will only tell instructions for the backend service.

### 1. Clone the Repo

```bash
git clone https://github.com/Soranosuke2001/LINE_Image_Saver.git
```

### 2. Python Virtual Environment

Create a Python virtual environment, initialize and install the necessary dependencies.

Note: `my_env` can be replaced with a name you prefer.

```bash
python -m venv my_env
source my_env/bin/activate
pip install -r requirements.txt
```

### 3. `.env` File

Create a `.env` file in the same directory level as the python virtual environment.

```
ALLOWED_HOSTS=localhost,testserver

LINE_CHANNEL_SECRET=
LINE_CHANNEL_ACCESS_TOKEN=

AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
BUCKET_NAME=
AWS_REGION=

IMAGE_FORMAT=JPEG
```

`ALLOWED_HOSTS`: If using a custom domain name, add the domain name at the end (`,` separated)

Note: You will need to create a LINE account and then login to the LINE Developer Console

`LINE_CHANNEL_SECRET`: Under `Basic Settings` for the specific channel created after creating a provider
`LINE_CHANNEL_ACCESS_TOKEN`: Under `Messaging API`. Theres a button to issue a new channel access token

Note: You will need to create a new AWS AMI user with the permissions to READ and WRITE to S3 buckets.

`AWS_ACCESS_KEY`: From AMI user
`AWS_SECRET_ACCESS_KEY`: From AMI user

`BUCKET_NAME`: You will need to create a new S3 bucket and provide the name of it here.
`AWS_REGION`: The region abbreviation of where the bucket is hosted

`IMAGE_FORMAT`: The image file format when saving to the bucket

### 4. Database Migrations

Other than files being uploaded to the S3 bucket, each track of events received are stored in a SQLite database. The SQLite file is created locally once the commands below are run.

Note: `manage.py` is located in `Backend/line_api/`

```python
python manage.py makemigrations
```

```python
python manage.py migrate
```

### 5. Run the Server

Note: The server is configured to run on port 8000

```python
python manage.py runserver
```
