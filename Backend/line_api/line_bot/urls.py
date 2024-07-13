from django.urls import path

from .views import (
  WebhookEvent,
  LineImageEvent,
  LineVideoEvent,
  LineAudioEvent,
  LineFileEvent,

  LineImageFetchEvent,
  LineVideoFetchEvent,
  LineAudioFetchEvent,
  LineFileFetchEvent,
)

app_name = "line_bot"

urlpatterns = [
  path("", WebhookEvent.as_view(), name="webhook_handler"),
  path("submit/image/", LineImageEvent.as_view(), name="image_handler"),
  path("submit/video/", LineVideoEvent.as_view(), name="video_handler"),
  path("submit/audio/", LineAudioEvent.as_view(), name="audio_handler"),
  path("submit/file/", LineFileEvent.as_view(), name="file_handler"),

  path("fetch/images/", LineImageFetchEvent.as_view(), name="image_fetch"),
  path("fetch/videos/", LineVideoFetchEvent.as_view(), name="video_fetch"),
  path("fetch/audios/", LineAudioFetchEvent.as_view(), name="audio_fetch"),
  path("fetch/files/", LineFileFetchEvent.as_view(), name="file_fetch"),
]
