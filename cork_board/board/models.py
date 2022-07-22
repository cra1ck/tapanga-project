from turtle import position
from django.db import models


# Create your models here.

class Ball(models.Model):
    """
    Model save info about ball position and etc.
    """
    name = models.AutoField(max_length=200)
    positionX = models.FloatField(null=True)
    positionY = models.FloatField(null=True)

    def __str__(self):
        return self.name