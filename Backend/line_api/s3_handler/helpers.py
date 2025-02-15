import os
import requests
from datetime import datetime

from PIL import Image
from io import BytesIO

from botocore.exceptions import NoCredentialsError

from .constants import MONTH_MAP, CONTENT_TYPES

CHANNEL_ACCESS_TOKEN = os.getenv('LINE_CHANNEL_ACCESS_TOKEN', None)

BUCKET_NAME = os.getenv("BUCKET_NAME", None)
AWS_REGION = os.getenv("AWS_REGION", None)


# Upload object to s3
def s3_upload(s3, body, object_name, file_type, content_type=None):
  try:
    if content_type:
       s3.put_object(Bucket=BUCKET_NAME, Key=object_name, Body=body, ContentType=content_type)
    else: 
        s3.put_object(Bucket=BUCKET_NAME, Key=object_name, Body=body, ContentType=CONTENT_TYPES[file_type])
        
    print(f"{object_name} has been uploaded to {BUCKET_NAME}")
    return True

  except FileNotFoundError:
    print("The file was not found")

  except NoCredentialsError:
    print("Credentials not available")

  except Exception as e:
    print("There was an error:")
    print(e)
  
  return False


def s3_delete(s3, object_name=None):
  try:
    if object_name:
      s3.delete_object(Bucket=BUCKET_NAME, Key=object_name)
      print(f"{object_name} has been deleted from {BUCKET_NAME}")

      return True
    else:
      all_objs =  s3.list_objects_v2(Bucket=BUCKET_NAME)
      if 'Contents' in all_objs:
        for obj in all_objs['Contents']:
          s3.delete_object(Bucket=BUCKET_NAME, Key=obj['Key'])
          print(f"Deleted object {obj['Key']} from bucket {BUCKET_NAME}")
      else:
        print(f"No objects found in bucket {BUCKET_NAME}")

      return True
      
  except Exception as e:
     print("There was an error:")
     print(e)
  
  return False


# Get the month from datetime object
def get_month(timestamp):
  date_format = "%Y-%m-%dT%H:%M:%S.%f"
  date_object = datetime.strptime(timestamp, date_format)
  month = date_object.month

  return date_object, MONTH_MAP[month]


# Convert binary image to image
def binary_image_convert(content):
    image = Image.open(BytesIO(content))
    image_bytes = BytesIO()

    image.save(image_bytes, format='JPEG')
    image_bytes.seek(0)

    return image_bytes


# Fetch the binary image from LINE data API
def fetch_binary_data(id):
    url = f'https://api-data.line.me/v2/bot/message/{id}/content'
    headers = {
      'Authorization': f'Bearer {CHANNEL_ACCESS_TOKEN}'
    }
    
    response = requests.get(url, headers=headers)

    if not response.status_code == 200:
        return False
    
    return response


def construct_filtered_image_data(data):
    id = data['image_url']
    user_id = data['user_id']
    timestamp, month_taken = get_month(data['timestamp'])
    object_path = f'{user_id}/{month_taken}/{id}'
    url = f'https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{object_path}'

    return {
        'image_id': id,
        'image_url': url,
        "user_id": user_id,
        "timestamp": timestamp,
    }, id, object_path
   

def construct_filtered_video_data(data):
    id = data['video_url']
    user_id = data['user_id']
    preview_image_url = data['preview_image_url']
    duration = data['duration_ms']
    timestamp, month_taken = get_month(data['timestamp'])
    object_path = f'{user_id}/{month_taken}/{id}'
    url = f'https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{object_path}'

    return {
        'video_id': id,
        'video_url': url,
        'preview_image_url': preview_image_url,
        'duration': duration,
        "user_id": user_id,
        "timestamp": timestamp,
    }, id, object_path


def construct_filtered_audio_data(data):
    id = data['audio_url']
    user_id = data['user_id']
    duration = data['duration_ms']
    timestamp, month_taken = get_month(data['timestamp'])
    object_path = f'{user_id}/{month_taken}/{id}'
    url = f'https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{object_path}'

    return {
        'audio_id': id,
        'audio_url': url,
        'duration': duration,
        "user_id": user_id,
        "timestamp": timestamp,
    }, id, object_path


def construct_filtered_file_data(data):
    id = data['file_url']
    filename = data['filename']
    filesize_bytes = data['filesize_bytes']
    user_id = data['user_id']
    timestamp, month_taken = get_month(data['timestamp'])
    object_path = f'{user_id}/{month_taken}/{id}'
    url = f'https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{object_path}'

    return {
        'file_id': id,
        'file_url': url,
        'filename': filename,
        'filesize_bytes': filesize_bytes,
        "user_id": user_id,
        "timestamp": timestamp,
    }, id, object_path

