from pathlib import Path
from datetime import timedelta
import os
import dj_database_url
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: don't hardcode secret key in production
SECRET_KEY = os.getenv("SECRET_KEY", "replace-this-in-production")

# DEBUG = os.getenv("DEBUG", "False").lower() == "true"

ALLOWED_HOSTS = [
    "portfolio-backend-0gnb.onrender.com",  # your Render backend
    "127.0.0.1",
    "localhost",
]


# -----------------------
# APPLICATIONS
# -----------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'myportfolio.apps.MyportfolioConfig',
]

# -----------------------
# MIDDLEWARE
# -----------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # added
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio.wsgi.application'

# -----------------------
# DATABASE
# -----------------------
import dj_database_url
import os

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'postgres',        # Supabase DB name
#         'USER': 'postgres',        # Supabase user
#         'PASSWORD': '915BidDolebW4lyV',    # Supabase password
#         'HOST': 'db.aptzoxomjcnsihefhkbv.supabase.co', # Supabase host
#         'PORT': '5432',
#         'OPTIONS': {
#             'sslmode': 'require',  # Supabase requires SSL
#         },
#     }
# }

import dj_database_url

DATABASES = {
    "default": dj_database_url.parse(
        "postgresql://postgres:915BidDolebW4lyV@db.aptzoxomjcnsihefhkbv.supabase.co:5432/postgres",
        conn_max_age=600,
        ssl_require=True
    )
}



DEBUG = True


# -----------------------
# CORS
# -----------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://portfolio-fronted-d3fj.onrender.com",
    "https://portfolio-fronted-static.onrender.com",
    # your render frontend URL
]
CORS_ALLOW_CREDENTIALS = True
# -----------------------
# JWT + REST FRAMEWORK
# -----------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=60),
}

# -----------------------
# STATIC & MEDIA FILES
# -----------------------
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# -----------------------
# OTHER SETTINGS
# -----------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
