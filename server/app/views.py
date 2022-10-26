from django.shortcuts import render
from django.contrib.auth.models import User

from datetime import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .models import Journal, Day

from .serializers import UserSerializer, JournalSerializer, DaySerializer

# Create your views here.
@api_view(['GET'])
def get_journals(request, user_token):
	token = Token.objects.filter(key=user_token).first()
	user = token.user
	journals = Journal.objects.filter(user=user).all()
	serializer = JournalSerializer(journals, many=True)
	return Response(serializer.data)


@api_view(['GET'])
def get_days(request, journal_id):
	journal = Journal.objects.filter(id=journal_id).first()
	days = Day.objects.filter(journal=journal).all()
	serializer = DaySerializer(days, many=True)
	return Response(serializer.data)


@api_view(['GET'])
def add_journal(request, user_token):
	token = Token.objects.filter(key=user_token).first()
	user = token.user
	if Journal.objects.filter(year=datetime.now().year, month=datetime.now().month, user=user).exists():
		return Response(False)
	else:
		journal = Journal(year=datetime.now().year, month=datetime.now().month, user=user)
		journal.save()
		return Response(True)


@api_view(['GET'])
def add_day(request, user_token, journal_id):
	token = Token.objects.filter(key=user_token).first()
	user = token.user
	journal = Journal.objects.filter(id=journal_id, user=user).first()
	if Day.objects.filter(day=datetime.now().day, journal=journal).exists():
		return Response(False)
	else:
		day = Day(day=datetime.now().day, journal=journal)
		day.save()
		return Response(True)


@api_view(['GET', 'POST'])
def update_profit(request, day_id):
	profit = request.data.get('profit')
	day = Day.objects.filter(id=day_id).first()
	day.profit = profit
	day.save()
	return Response(True)


@api_view(['GET', 'POST'])
def update_loss(request, day_id):
	loss = request.data.get('loss')
	day = Day.objects.filter(id=day_id).first()
	day.loss = loss
	day.save()
	return Response(True)