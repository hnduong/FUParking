import React from 'react'
import { connect } from 'react-redux'
import { Animated, StyleSheet, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { Card, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

import { FUPComponent, FUPText } from '../Components'
// import FrogApi from '../Api/FrogParking'

import PublicParkingLocations from '../Resources/PublicParkingLocations.json'

import { App, Colors, Metrics } from '../Theme'

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
      zones: [],
      visible: true
    }
  }

  static defaultProps = {
    draggableRange: {
      top: Metrics.screenHeight * 4 / 5,
      bottom: 120
    }
  }

  panelHeight = new Animated.Value(-120)

  async componentWillMount () {
    // const response = await FrogApi.getPublicParkingLocations()
    const response = PublicParkingLocations
    if (response.ok) {
      const zones = response.data.PublicParkingLocations.map((ppl) => {
        const { Polygon, Location, Name, Description } = ppl

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
            name: Name,
            polygon,
            description: Description.replace(/<p>/g, '').replace(/<\/p>/g, ''),
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
        id={`zonePolygon${index}`}
        shape={{
          type: 'FeatureCollection',
          features: [zone.polygon]
        }}
      >
        <MapboxGL.FillLayer
          id={`zonePolygonFill${index}`}
          style={mapStyles.zonePolygonFill}
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

  onPressMarker = (index) => {}

  renderMarker = (zone, index) => {
    return (
      <MapboxGL.PointAnnotation
        key={index}
        id={`zoneMarker${index}`}
        coordinate={zone.location}
        onPress={this.onPressMarker(index)}
      >
        <FUPText small>{zone.name}{'\n'}{zone.description}</FUPText>
      </MapboxGL.PointAnnotation>
    )
  }

  renderMarkers = () => {
    const { zones } = this.state
    if (this.hasZones(zones)) {
      return zones.map(this.renderMarker)
    }
  }

  onPanelDrag = (v) => {
    this.panelHeight.setValue(v)
  }

  onIconPress = () => {
    const { top, bottom } = this.props.draggableRange
    if (this.panelHeight._value === -top) {
      this.panel.transitionTo(bottom)
    } else if (this.panelHeight._value === -bottom) {
      this.panel.transitionTo(top)
    } else if (this.panelHeight._value < -(top + bottom) / 2) {
      this.panel.transitionTo(bottom)
    } else if (this.panelHeight._value >= -(top + bottom) / 2) {
      this.panel.transitionTo(top)
    }
  }

  onPressMap = () => {
    const { bottom } = this.props.draggableRange
    this.panel.transitionTo(bottom)
  }

  renderPanel = () => {
    const { draggableRange } = this.props
    const { top, bottom } = draggableRange
    const totalDraggable = top + bottom

    const rotate = this.panelHeight.interpolate({
      inputRange: [-top, -bottom],
      outputRange: ['0deg', '180deg']
    })

    const scale = this.panelHeight.interpolate({
      inputRange: [-top, -totalDraggable * 0.75, -totalDraggable * 0.5, -totalDraggable * 0.25, -bottom],
      outputRange: [1, 0.8725, 0.75, 0.8725, 1],
      extrapolate: 'clamp'
    })
    const transform = [{ rotate }, { scale }]

    return (
      <SlidingUpPanel
        visible
        showBackdrop={false}
        ref={this.setRef('panel')}
        draggableRange={draggableRange}
        onDrag={this.onPanelDrag}
      >
        <TouchableOpacity style={[styles.upIconContainer, { transform }]} onPress={this.onIconPress}>
          <Icon name='arrow-downward' color={Colors.white} />
        </TouchableOpacity>
        <View style={{ height: draggableRange.top, paddingHorizontal: 10}}>
          <View style={[styles.panelHeader, { height: 120, borderBottomWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5 }]}>
            <FUPText style={{ color: '#FFF' }}>Parking Availability</FUPText>
          </View>
          <View style={[styles.panelBody, { height: draggableRange.top * 0.7 }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: 50, height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <FUPText light small>123</FUPText>
              </View>
              {/* <FlatList
                scrollEnabled
                data={this.state.zones}
                keyExtractor={(item, index) => index}
                renderItem={({ item: zone }) => {
                  return (
                    <Card style={{ width: 50 }}>
                      <FUPText light small>{zone.name}{'\n'}{zone.description}</FUPText>
                    </Card>
                  )
                }}
              /> */}
            </View>
          </View>
        </View>
      </SlidingUpPanel>
    )
  }

  renderMap = () => {
    return (
      <MapboxGL.MapView
        ref={this.setRef('mapView')}
        onPress={this.onPressMap}
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
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flex}>
          {this.renderMap()}
          {this.renderPanel()}
        </View>
      </View>
    )
  }
}

const mapStyles = MapboxGL.StyleSheet.create({
  zonePolygonFill: {
    fillAntialias: true,
    fillColor: Colors.bloodOrange,
    fillOutlineColor: Colors.border
  }
})

const styles = StyleSheet.create({
  ...App.screen,
  ...App.form,
  ...App.layout,
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    backgroundColor: Colors.tertiary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panelBody: {
    backgroundColor: Colors.tertiary
  },
  upIconContainer: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: Colors.primary,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    zIndex: 1
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AvailableSpaces)
