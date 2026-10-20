# django-verse

## What it is
A day-by-day Django learning log.
- `day1/`: Django basics: project and app setup, models, migrations (SQLite).
- `day2/`: a REST API with Django REST Framework (`api/` app: models, serializers, views, CORS).

Each day has its own README with notes.

## Stack
Python, Django, Django REST Framework, django-cors-headers, SQLite

## How to run
```bash
cd day2            # or day1
python -m venv .venv && source .venv/bin/activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

## What I learned
TODO
