from django.urls import path

from . import views

# Create your urls here.
urlpatterns = [
	path('get-journals/<user_token>/', views.get_journals),
	path('get-days/<journal_id>/', views.get_days),
	path('add-journal/<user_token>/', views.add_journal),
	path('add-journal-day/<user_token>/<journal_id>/', views.add_day),
	path('update-day-profit/<day_id>/', views.update_profit),
	path('update-day-loss/<day_id>/', views.update_loss),
]