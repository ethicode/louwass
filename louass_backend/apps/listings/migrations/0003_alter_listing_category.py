# Generated by Django 5.2.3 on 2025-06-24 16:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("category", "0002_alter_category_description_alter_category_file"),
        ("listings", "0002_listing_category"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listing",
            name="category",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="listings",
                to="category.category",
            ),
        ),
    ]
