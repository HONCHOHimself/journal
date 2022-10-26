from rest_framework import serializers

from django.contrib.auth.models import User

from .models import Journal, Day

# Create your serializers here.
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'date_joined']


class JournalSerializer(serializers.ModelSerializer):
	class Meta:
		model = Journal
		fields = ['id', 'year', 'month', 'user']


class DaySerializer(serializers.ModelSerializer):
	class Meta:
		model = Day
		fields = ['id', 'day', 'profit', 'loss', 'journal']