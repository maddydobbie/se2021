# Generated by Django 2.2 on 2019-04-12 15:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('beachprofile', '0006_review'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='beach',
            unique_together={('beachname', 'lat', 'lng')},
        ),
    ]
