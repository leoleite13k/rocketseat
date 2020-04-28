import React from 'react';
import MapsDirections from 'react-native-maps-directions';

export default function Directions({ destination, origin, onReady }) {
  return (
    <MapsDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyDwu23LuQgFVT8pUUF0pFzGkXVAG1Q25KI"
      strokeWidth={3}
      strokeColor="#222"
    />
  );
}
