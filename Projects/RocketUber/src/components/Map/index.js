import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { KEY_GOOGLE_API } from 'react-native-dotenv';

import { getPixelSize } from '../../utils';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import {
  Container,
  StyledMapView,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
} from './styles';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

Geocoder.init(KEY_GOOGLE_API);

export default function Map() {
  const [region, setRegion] = useState({});
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);

  const mapViewRef = useRef();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const currentLocation = address.substring(0, address.indexOf(','));

        setLocation(currentLocation);
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        });
      }, // success
      (error) => {
        console.log(error);
      }, // error
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }, []);

  function handleLocationSelected(data, { geometry }) {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  }

  function handleBack() {
    setDestination(null);
  }

  return (
    <Container>
      <StyledMapView
        region={region}
        showsUserLocation
        loadingEnabled
        ref={mapViewRef}>
        {destination && (
          <>
            <Directions
              origin={region}
              destination={destination}
              onReady={(result) => {
                setDuration(Math.floor(result.duration));

                mapViewRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    top: getPixelSize(50),
                    bottom: getPixelSize(350),
                    left: getPixelSize(50),
                    right: getPixelSize(50),
                  },
                  animated: true,
                });
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{ x: 0, y: 0 }}
              image={markerImage}>
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>

            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </>
        )}
      </StyledMapView>

      {destination ? (
        <>
          <Back onPress={handleBack}>
            <Image source={backImage} />
          </Back>
          <Details />
        </>
      ) : (
        <Search onLocationSelected={handleLocationSelected} />
      )}
    </Container>
  );
}
