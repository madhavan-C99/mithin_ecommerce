from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from huey.contrib.djhuey import task

@task()
def send_otp_email(user_email, otp):
    subject = 'Your OTP for Verification'
    message = f'Hi, Your OTP for login is: {otp}. It will expire in 5 minutes.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user_email]

    try:
        send_mail(subject, message, email_from, recipient_list)
        return True
    except Exception as e:
        print(f"Email Error: {e}")
        return False