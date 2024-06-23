# Generated by Django 5.0.6 on 2024-06-23 09:15

import books.models
import django.contrib.postgres.indexes
import django.db.models.functions.text
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=250)),
                ('slug', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=1000)),
                ('pages', models.PositiveIntegerField()),
                ('price', models.DecimalField(decimal_places=3, max_digits=9)),
                ('stock', models.PositiveIntegerField()),
                ('image', models.ImageField(blank=True, null=True, upload_to=books.models.book_image_file_path)),
                ('views', models.PositiveIntegerField(blank=True, default=0, null=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'indexes': [django.contrib.postgres.indexes.HashIndex(fields=['slug'], name='books_book_slug_hash_idx')],
            },
        ),
        migrations.AddConstraint(
            model_name='book',
            constraint=models.UniqueConstraint(django.db.models.functions.text.Lower('name'), name='books_book_name_unique_idx'),
        ),
    ]
