from django.urls import path

from .views import (
  WebhookEvent,
  LineImageEvent,
  LineVideoEvent,
  LineAudioEvent,
  LineFileEvent,
)

app_name = "line_bot"

urlpatterns = [
  path("", WebhookEvent.as_view(), name="webhook_handler"),
  path("submit/image/", LineImageEvent.as_view(), name="image_handler"),
  path("submit/video/", LineVideoEvent.as_view(), name="video_handler"),
  path("submit/audio/", LineAudioEvent.as_view(), name="audio_handler"),
  path("submit/file/", LineFileEvent.as_view(), name="file_handler"),

]
