from django.db import models
from django.conf import settings
# Create your models here.
class CovidAll(models.Model):
    country = models.CharField(max_length=100)
    code = models.CharField(max_length=5)
    population = models.CharField(max_length=20)
    date = models.DateField()
    confirmed = models.IntegerField()
    deaths = models.IntegerField()
    recovered = models.IntegerField()
    active = models.IntegerField()
    new_confirmed = models.IntegerField()
    new_deaths = models.IntegerField()
    new_recovered = models.IntegerField()

class CovidIndia(models.Model):
    state = models.CharField(max_length=100)
    statecode = models.CharField(max_length=5)
    active = models.IntegerField()
    confirmed = models.IntegerField()
    deaths = models.IntegerField()
    recovered = models.IntegerField()
