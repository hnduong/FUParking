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
      parkingPolygons: []
    }
  }

  async componentWillMount () {
    // const response = await FrogApi.getPublicParkingLocations()
    const response = PublicParkingLocations
    if (response.ok) {
      const parkingPolygons = response.data.PublicParkingLocations.map((ppl) => {
        const Polygon = ppl.Polygon
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
          return polygon
        }
      })
      this.setState({ parkingPolygons })
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flex}>
          <MapboxGL.MapView
            showUserLocation
            centerCoordinate={[-117.839, 33.65]}
            zoomLevel={16}
            compassEnabled
            logoEnabled
            userTrackingMode={MapboxGL.UserTrackingModes.Follow}
            style={StyleSheet.absoluteFill}
          >
            <MapboxGL.ShapeSource
              id='parkingPolygonSource'
              shape={{
                type: 'FeatureCollection',
                features: this.state.parkingPolygons
              }}
            >
              <MapboxGL.FillLayer
                id='parkingPolygonFill'
                style={mapStyles.parkingPolygonFill}
              />
            </MapboxGL.ShapeSource>
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
    fillOutlineColor: 'rgba(255, 255, 255, 0.84)'
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
