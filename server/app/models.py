from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Journal(models.Model):
	year = models.IntegerField()
	month = models.IntegerField()
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journal')

	def __str__(self):
		return f'{self.user.username}\'s Journal'

	class Meta:
		ordering = ['year']


class Day(models.Model):
	day = models.IntegerField()
	profit = models.FloatField(default=0.00)
	loss = models.FloatField(default=0.00)
	journal = models.ForeignKey(Journal, on_delete=models.CASCADE, related_name='days')

	def __str__(self):
		return f'{self.journal.user.username}\'s Journal\'s Days'

	class Meta:
		ordering = ['day']