from django.urls import path

from . import views

# Create your urls here.
urlpatterns = [
	path('validate-username/', views.check_username),
]