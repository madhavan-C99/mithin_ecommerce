
from rest_framework.exceptions import APIException
import datetime
from rest_framework.exceptions import APIException
import logging
from django.core.files.storage import FileSystemStorage
from django.utils.crypto import get_random_string
from ..models.file_upload import FileUpload
from django.core.files.base import ContentFile
import base64
from django.http import FileResponse
import shutil
from datetime import datetime
from pathlib import Path
logger = logging.getLogger('django')
 
    
def upload_file(username, **data):
    try:
        fl = data.get('file')
        logger.info("Adm|services|file_service|upload_file: file data " + fl.name)

        tmp_file_name = get_random_string(length=12) + '_' + fl.name
        fs = FileSystemStorage(location='storage/tmp/')
        logger.info("Adm|services|file_service|upload_file: file location " + fs.base_location)
        fs.save(tmp_file_name,fl)
        fl_upload = FileUpload(tmp_file_name='storage/tmp/' + tmp_file_name, source_field=data.get('source_field'), uploaded_by=username,
                               orig_file_name=fl.name)  
        fl_upload.save()

        return {'tmp_file_name': fl_upload.tmp_file_name}

    except Exception as e:
        raise APIException(str(e))
    
def upload_user_profile(**data):
    try:
        file = data.get('user_profile')
        req_file = open(('file'), 'rb')
        response = FileResponse(req_file)
        c = response
        img = file.split('_')
        fl = img[1]
        logger.info("Adm|services|file_service|upload_file: file data " + fl)
        tmp_file_name = get_random_string(length=12) + '_' + fl
        fs = FileSystemStorage(location='storage/product/product_snap/')
        fl_name = str('storage/user/user_profile/') + str(tmp_file_name)
        logger.info("Adm|services|file_service|upload_file:file location" + fs.base_location)
        fs.save(fl_name,)
        return fl_name
        

    except Exception as e:
        raise APIException(str(e))



def upload_file_as_bytes(username, **data):
    try:
        tmp_file_name = get_random_string(length=12) + '_' + data.get('filename')
        fs = FileSystemStorage(location='storage/tmp/')

        file_data = ContentFile(base64.b64decode(data.get('file')))
        fs.save(tmp_file_name, file_data)

        fl_upload = FileUpload(tmp_file_name='storage/tmp/' + tmp_file_name, source_field=data.get('source_field'),
                               uploaded_by=username, orig_file_name=data.get('filename'))
        fl_upload.save()

        return {'tmp_file_name': fl_upload.tmp_file_name}

    except Exception as e:
        raise APIException(str(e))

# @shared_task
def move_tmp_file(flupd_id):
    logger.info('tasks|file_tasks|move_tmp_file: inside here...')
    fl_upd = FileUpload.objects.get(id=flupd_id)
    print('move run')
    if fl_upd is not None:
        # Check and create destination folder if does not exist\
        print('m1')
        dest_dir = Path(fl_upd.storage_file_name).parent.absolute()
        print('m2')
        Path(dest_dir).mkdir(parents=True, exist_ok=True)
        print('m3')
        shutil.move(fl_upd.tmp_file_name, fl_upd.storage_file_name)
        print('m4')
        fl_upd.is_moved = True
        fl_upd.moved_at = datetime.now()
        fl_upd.save()
        print('m4')
        return "done"
    
    
    
    




