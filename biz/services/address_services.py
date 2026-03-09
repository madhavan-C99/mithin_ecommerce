from ..models.address import Address
from rest_framework.exceptions import APIException


def add_address(**data):
    try:
        user=data.get('user_id')
        new_address=Address.objects.create(user_id=user,name=data.get('name'),address_line1=data.get('address_line1'),
                                           address_line2=data.get('address_line2'),city=data.get('city'),state=data.get('state'),
                                           country=data.get('country'),pincode=data.get('pincode'))
        return f"New Address Added for this user {user}"
    except Exception as e:
        raise APIException(e)
    
def fetch_all_address(data):
    try:
        address=Address.objects.filter(user_id=data.get('id'))

        final_data=[]

        for item in address:
            a={
                "id":item.id,
                "name":item.name,
                "address_line1":item.address_line1,
                "address_line2":item.address_line2,
                "city":item.city,
                "state":item.state,
                "country":item.country,
                "pincode":item.pincode
            }
            final_data.append(a)
        return final_data
    except Exception as e:
        raise APIException(e)
    
def update_address(**data):
    try:
        address=Address.objects.filter(id=data.get('address_id')).first()

        updated=False

        if 'name' in data:
            address.name=data.get('name')
            updated=True
        if 'address_line1' in data:
            address.address_line1=data.get('address_line1')
            updated=True
        if 'address_line2' in data:
            address.address_line2=data.get('address_line2')
            updated=True
        if 'state' in data:
            address.state=data.get('state')
            updated=True
        if 'city' in data:
            address.city=data.get('city')
            updated=True
        if 'country' in data:
            address.country=data.get('country')
            updated=True
        if 'pincode' in data:
            address.pincode=data.get('pincode')
            updated=True

        if updated:
            address.save()
            return "Address Updated Successfully." 
        else:
            return "No fields provide for Update."
    except Exception as e:
        raise APIException(e)


def delete_address(**data):
    try:
        address=Address.objects.filter(user_id=data.get('user_id'),id=data.get('id')).first()

        address.delete()

        return "Address Deleted Successfully."
    except Exception as e:
        raise APIException(e)
    
def fetch_one_address(data):
    try:
        address=Address.objects.filter(id=data.get('id')).first()
        return {
                "id":address.id,
                "name":address.name,
                "address_line1":address.address_line1,
                "address_line2":address.address_line2,
                "city":address.city,
                "state":address.state,
                "country":address.country,
                "pincode":address.pincode
            }
    except Exception as e:
        raise APIException(e)
