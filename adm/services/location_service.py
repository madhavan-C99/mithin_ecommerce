import googlemaps
from django.conf import settings

def get_google_maps_client():
    return googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)

def get_customer_distance(user_address):

    gmaps = get_google_maps_client()
    
    try:
        # print('user',user_address)
        geocode_result = gmaps.geocode(user_address)
        
        # print('result',geocode_result)
        if not geocode_result:
            return {"error": "Not Found This Address!"}

        location = geocode_result[0]['geometry']['location']
        customer_lat = location['lat']
        customer_lng = location['lng']

        store_lat, store_lng = 11.820579406912266, 79.78363609487317

        matrix = gmaps.distance_matrix(
            origins=[(customer_lat, customer_lng)],
            destinations=[(store_lat, store_lng)],
            mode='driving'
        )

        element = matrix['rows'][0]['elements'][0]
        # print('e',element)
        
        if element.get('status') == 'OK':
            distance_in_meters=element['distance']['value']
            # print(distance_in_meters)

            if distance_in_meters <= 3000:
                eligible=True
            else:
                eligible=False

            return {
                "formatted_address": geocode_result[0]['formatted_address'],
                "distance": element['distance']['text'],
                "duration": element['duration']['text'],
                "eligibility":eligible,
                "status": "OK"
            }
        
        return {"error": "No Road connectivity."}

    except Exception as e:
        return {"error": f"Google API Error: {str(e)}"}



def get_address_from_coords(**data):
    lat=data.get('lat')
    lng=data.get('lng')
    gmaps = get_google_maps_client()
    try:
        reverse_geocode_result = gmaps.reverse_geocode((lat, lng))
        
        if not reverse_geocode_result:
            return {"error": "Address not found"}
        
        components = reverse_geocode_result[0]['address_components']

        door_no = None
        street_no = None
        street_name = None
        sub_area=None
        main_area=None
        area = None
        city = None
        state = None
        pincode = None

        for comp in components: 
            types = comp['types']

            if 'street_number' in types or 'premise' in types:
                door_no = comp['long_name']
 
            if 'route' in types:
                street_name = comp['long_name']

            if 'sublocality_level_2' in types or 'neighborhood' in types:
                sub_area = comp['long_name']

            if 'sublocality_level_1' in types or 'sublocality' in types:
                main_area = comp['long_name']

            if 'locality' in types:
                city = comp['long_name']

            if 'administrative_area_level_1' in types:
                state = comp['long_name']

            if 'postal_code' in types:
                pincode = comp['long_name']

        address_line = " ".join(filter(None, [door_no, street_no, street_name]))

        if sub_area and main_area:
            if sub_area.strip().lower() == main_area.strip().lower():
                area=sub_area
            else:
                area = f"{sub_area}, {main_area}"
        else:
            area = sub_area or main_area

        return {
            "address_line": address_line,
            "area_or_nagar": area,
            "city": city,
            "state": state,
            "pincode": pincode,
        }
    except Exception as e:
        return {"error": str(e)}