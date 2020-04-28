import React from 'react';
import MapsDirections from 'react-native-maps-directions';
import { KEY_GOOGLE_API } from 'react-native-dotenv';

export default function Directions({ destination, origin, onReady }) {
  return (
    <MapsDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey={KEY_GOOGLE_API}
      strokeWidth={3}
      strokeColor="#222"
    />
  );
}
