from ..models.address import Address
from adm.models.customer_profile import CustomerProfile
from rest_framework.exceptions import APIException


def add_address(**data):
    try:
        user=data.get('user_id')
        customer=CustomerProfile.objects.filter(user_id=user).first()
        if not customer:
            return "User Not Found."  
        address_exists=Address.objects.filter(user=customer).exists()
        default= not address_exists
        new_address=Address.objects.create(user=customer,name=data.get('name'),mobile=data.get('mobile'),category=data.get('category'),address_line1=data.get('address_line1'),
                                           address_line2=data.get('address_line2'),landmark=data.get('landmark'),city=data.get('city'),state=data.get('state'),
                                           country=data.get('country'),pincode=data.get('pincode'),is_default=default)
        return f"New Address Added for this user {user}"
    except Exception as e:
        raise APIException(e)
    
def fetch_all_address(data):
    try:
        user=CustomerProfile.objects.filter(user_id=data.get('user_id')).first()

        if not user:
            return "User not found"

        address=Address.objects.filter(user=user)

        final_data=[]

        for item in address:
            a={
                "id":item.id,
                "name":item.name,
                "mobile":item.mobile,
                "category":item.category,
                "address_line1":item.address_line1,
                "address_line2":item.address_line2,
                "landmark":item.landmark,
                "city":item.city,
                "state":item.state,
                "country":item.country,
                "pincode":item.pincode,
                "is_default":item.is_default
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
        if 'mobile' in data:
            address.mobile=data.get('mobile')
            updated=True
        if 'category' in data:
            address.category=data.get('category')
            updated=True
        if 'address_line1' in data:
            address.address_line1=data.get('address_line1')
            updated=True
        if 'address_line2' in data:
            address.address_line2=data.get('address_line2')
            updated=True
        if 'landmark' in data:
            address.landmark=data.get('landmark')
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
        address_to_delete = Address.objects.filter(id=data.get('address_id')).first()

        user_id = data.get('user_id')
        user=CustomerProfile.objects.filter(user_id=user_id).first()

        if not user:
            return "User Not Found"
        was_default = address_to_delete.is_default

        address_to_delete.save_delete(user_id=user_id)

        if was_default:
            remaining_address = Address.objects.filter(user=user).first()
            
            if remaining_address:
                remaining_address.is_default = True
                remaining_address.save()
                return "Default address deleted. New default set."
            else:
                return "All addresses deleted."
        
        return "Address deleted successfully."

    except Exception as e:
        raise APIException(e)
    

def default_address(**data):
    try:
        address_id=data.get('address_id')
        address=Address.objects.filter(id=address_id).first()
        # user=CustomerProfile.objects.filter(user_id=data.get('user_id')).first()
        old_address=Address.objects.filter(user=address.user,is_default=True).update(is_default=False)
        address.is_default=True
        address.save()
        return f"This address id:{address_id} set to defualt successfully."
    except Exception as e:
        raise APIException(e)
    
def fetch_default_address(data):
    try:
        user_id=data.get('user_id')
        user=CustomerProfile.objects.filter(user_id=user_id).first()

        if not user:
            return "User Not Found"
        address=Address.objects.filter(user=user,is_default=True).first()
        result={
                "id":address.id,
                "name":address.name,
                "mobile":address.mobile,
                "category":address.category,
                "address_line1":address.address_line1,
                "address_line2":address.address_line2,
                "landmark":address.landmark,
                "city":address.city,
                "state":address.state,
                "country":address.country,
                "pincode":address.pincode
            }
        return result
    except Exception as e:
        raise APIException(e)