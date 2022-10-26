from django.contrib import admin

from .models import Journal, Day

# Register your models here.
admin.site.register(Journal)
admin.site.register(Day)