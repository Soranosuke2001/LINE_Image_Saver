from django.urls import path

from .views import (
  WebhookEvent,
  LineImageEvent,
  LineVideoEvent,
)

app_name = "line_bot"

urlpatterns = [
  path("", WebhookEvent.as_view(), name="webhook_handler"),
  path("submit/image/", LineImageEvent.as_view(), name="image_handler"),
  path("submit/video/", LineVideoEvent.as_view(), name="video_handler"),
]
