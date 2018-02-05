import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

import { FUPComponent } from '../Components'
// import FrogApi from '../Api/FrogParking'

import PublicParkingLocations from '../Resources/PublicParkingLocations.json'

import { App, Colors } from '../Theme'

class AvailableSpaces extends FUPComponent {
  constructor (props) {
    super(props)
    this.setNavigatorToButtons({
      rightButtons: [
        {
          component: 'MenuButton',
          id: '22',
          showAsAction: 'always'
        }
      ]
    })
    this.state = {
      zones: []
    }
  }

  async componentWillMount () {
    // const response = await FrogApi.getPublicParkingLocations()
    const response = PublicParkingLocations
    if (response.ok) {
      const zones = response.data.PublicParkingLocations.map((ppl) => {
        const Polygon = ppl.Polygon
        const Location = ppl.Location
        if (Array.isArray(Polygon)) {
          const formattedPolygon = Polygon.map(p => ([p.Longitude, p.Latitude]))
          const polygon = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [formattedPolygon]
            }
          }
          const zone = {
            polygon,
            location: ([Location.Longitude, Location.Latitude])
          }
          return zone
        }
      })
      this.setState({ zones })
    }
  }

  hasZones = (zones) => Array.isArray(zones) && zones.length > 0

  renderZone = (zone, index) => {
    return (
      <MapboxGL.ShapeSource
        onPress={() => { console.log('presssed')}}
        key={index}
        id={`parkingPolygonSource${index}`}
        shape={{
          type: 'FeatureCollection',
          features: [zone.polygon]
        }}
      >
        <MapboxGL.FillLayer
          id={`parkingPolygonFill${index}`}
          style={mapStyles.parkingPolygonFill}
        />
      </MapboxGL.ShapeSource>
    )
  }

  renderZones = () => {
    const { zones } = this.state
    if (this.hasZones(zones)) {
      return zones.map(this.renderZone)
    }
  }

  renderMarker = () => {
    
  }

  renderMarkers = () => {
    const { zones } = this.state
    if (this.hasZones(zones)) {
      return zones.map(this.renderMarker)
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flex}>
          <MapboxGL.MapView
            ref={this.setRef('mapView')}
            centerCoordinate={[-117.839, 33.65]}
            showUserLocation
            zoomLevel={15.5}
            compassEnabled
            logoEnabled
            style={StyleSheet.absoluteFill}
          >
            {this.renderMarkers()}
            {this.renderZones()}
          </MapboxGL.MapView>
        </View>
      </View>
    )
  }
}

const mapStyles = MapboxGL.StyleSheet.create({
  parkingPolygonFill: {
    fillAntialias: true,
    fillColor: Colors.bloodOrange,
    fillOutlineColor: Colors.border
  }
})

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  ...App.layout
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AvailableSpaces)
