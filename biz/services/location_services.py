# 


import math
# import requests # Indha library kandaipa venum
from django.conf import settings
from rest_framework.exceptions import APIException

def get_location(**data):
    try:
        # Data-va float-ah mathiduroam
        user_lat = float(data.get('user_lat'))
        user_lon = float(data.get('user_long'))
        
        # Shop Location (Unga exact coordinates)
        SHOP_LAT = 12.975918852126421 
        SHOP_LON = 80.22153653449372

        # --- OSRM API Logic Starts ---
        # Note: OSRM expects [Longitude, Latitude] format
        osrm_url = f"http://router.project-osrm.org/route/v1/driving/{SHOP_LON},{SHOP_LAT};{user_lon},{user_lat}?overview=false"
        
        response = requests.get(osrm_url, timeout=5) # 5 sec timeout safety-ku
        res_data = response.json()

        if res_data.get('code') == 'Ok':
            # Distance meters-la kidaikkum, adhai KM-ku mathi round pandroam
            road_distance_km = res_data['routes'][0]['distance'] / 1000
            return round(road_distance_km, 2)
        # --- OSRM API Logic Ends ---

        # Fallback Logic: OSRM fail aana matum pazhaya Haversine formula run aagum
        R = 6371.0  
        phi1, phi2 = math.radians(SHOP_LAT), math.radians(user_lat)
        dphi = math.radians(user_lat - SHOP_LAT)
        dlambda = math.radians(user_lon - SHOP_LON)
        a = math.sin(dphi / 2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        
        return round(R * c * 1.10, 2)

    except Exception as e:
        # Edhavadhu major error vandha APIException raise pannum
        raise APIException(f"Distance calculation error: {str(e)}")