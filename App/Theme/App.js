
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

const App = {
  theme: {
    dark: {
      backgroundColor: Colors.dark
    },
    darkText: {
      color: Colors.light
    },
    errorText: {
      color: Colors.error
    },
    darkIcon: {
      fontSize: 40,
      color: Colors.light
    },
    darkButton: {
      height: 50,
      backgroundColor: Colors.dark
    },
    light: {
      backgroundColor: Colors.light
    },
    lightText: {
      color: Colors.text
    },
    lightIcon: {
      fontSize: 40,
      color: Colors.text
    },
    lightButton: {
      backgroundColor: Colors.light
    }
  },
  form: {
    inputContainer: {
      flex: 0,
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10
    },
    buttonContainer: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10
    },
    inputError: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: Colors.error
    },
    flexRow: {
      flexDirection: 'row'
    }
  },
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    centered: {
      alignItems: 'center'
    },
    topAligned: {
      justifyContent: 'flex-start'
    },
    container: {
      flex: 0,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    sectionFull: {
      margin: 0,
      padding: 0
    },
    section: {
      margin: 0,
      padding: 0,
      width: '75%'
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.text,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    },
    headerMargin: {
      marginTop: 7 * Metrics.baseMargin
    },
    bottomPadding: {
      paddingBottom: 7 * Metrics.baseMargin
    }
  },
  btnCloseIcon: {
    marginRight: 0
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
  layout: {
    flex: {
      flex: 1
    },
    flexRow: {
      flexDirection: 'row'
    },
    flexColumn: {
      flexDirection: 'column'
    },
    alignCenter: {
      alignItems: 'center'
    },
    justifyCenter: {
      justifyContent: 'center'
    },
    width90: {
      width: '90%'
    },
    width80: {
      width: '80%'
    },
    width70: {
      width: '70%'
    }
  }
}

export default App
