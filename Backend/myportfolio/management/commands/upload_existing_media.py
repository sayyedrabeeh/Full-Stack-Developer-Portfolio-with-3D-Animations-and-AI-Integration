# myportfolio/management/commands/upload_existing_media.py
from django.core.management.base import BaseCommand
from myportfolio.models import ProjectImage
import cloudinary.uploader

class Command(BaseCommand):
    help = 'Upload existing media to Cloudinary'

    def handle(self, *args, **kwargs):
        images = ProjectImage.objects.all()
        for img in images:
            local_path = img.image.path
            try:
                result = cloudinary.uploader.upload(local_path)
                cloud_url = result.get('secure_url')
                
                if cloud_url:
                    img.image = cloud_url  # Save Cloudinary URL in DB
                    img.save()
                    self.stdout.write(f'Successfully uploaded {local_path} to {cloud_url}')
                else:
                    self.stdout.write(f'Failed to upload {local_path}')
            except FileNotFoundError:
                self.stdout.write(f'File not found, skipping: {local_path}')
