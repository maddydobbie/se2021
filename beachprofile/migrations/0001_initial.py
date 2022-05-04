# Generated by Django 2.2 on 2019-04-10 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Beach',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('beachname', models.CharField(max_length=50)),
                ('safety', models.IntegerField(default=0)),
                ('lat', models.IntegerField()),
                ('lng', models.IntegerField()),
            ],
        ),
    ]