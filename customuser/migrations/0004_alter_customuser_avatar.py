# Generated by Django 3.2.5 on 2021-07-09 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customuser', '0003_auto_20210707_1942'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='avatar',
            field=models.ImageField(blank=True, default='avatars/cloudavatar.png', null=True, upload_to='avatars/'),
        ),
    ]
