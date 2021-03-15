import React, { useEffect, useState } from 'react'
import { View, StatusBar, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Toast, Root, Text } from 'native-base'
import * as Font from 'expo-font'
import Slider from "@react-native-community/slider"
import Checkbox from '@react-native-community/checkbox'
import Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons'

export default function App() {
  const [appReady, setAppReady] = useState(false)
  const [password, setPassword] = useState('')
  const [size, setSize] = useState(10)
  const [specialChars, setSpecialChars] = useState(false)

  const charsetMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%*()-={}[]' // -14

  useEffect(() => {
    async function StartApplication() {
      await loadFonts()
    }

    async function loadFonts() {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })

      setAppReady(true)
    }

    StartApplication()
  }, [])


  function generatePassword() {
    let passwd = ''
    let charmapSize = specialChars ? charsetMap.length : charsetMap.length - 14

    for (let i = 0; i < size; i++) {
      passwd += charsetMap.charAt(Math.floor(Math.random() * charmapSize))
    }

    setPassword(passwd)
  }

  function copyToClipboard() {
    Clipboard.setString(password)
    Toast.show({
      text: 'Senha copiada',
      buttonText: "Done",
      type: "success",
      duration: 1000
    })
  }

  return (
    <>
      {
        appReady ? (
          <Root>
            <StatusBar
              backgroundColor="#ffbb00"
              barStyle="light-content"
            />
            <SafeAreaView style={appStyles.container}>
              <Image style={appStyles.image} source={require('./src/assets/lock-icon.png')} />
              <Text style={appStyles.charLabel}>{size} Caracteres</Text>

              <View style={appStyles.sliderContainer}>
                <Slider
                  style={appStyles.slider}
                  minimumValue={5}
                  maximumValue={15}
                  minimumTrackTintColor="#f00"
                  maximumTrackTintColor="#080"
                  value={size}
                  step={1}
                  onValueChange={(value) => setSize(Number(value.toFixed(0)))}
                />

              </View>
              <View style={appStyles.checkboxContainer} onTouchEndCapture={() => setSpecialChars(!specialChars)}>
                <Checkbox
                  value={specialChars}
                  tintColors={{ true: '#ffa600', false: '#ffa600' }}
                />
                <Text style={appStyles.checkboxLabel}>Usar caracteres especiais</Text>
              </View>


              <TouchableOpacity
                style={{ ...appStyles.sliderContainer, backgroundColor: "#ffbb00" }}
                onPress={generatePassword}
              >
                <Text style={appStyles.buttonText}>Gerar senha</Text>
              </TouchableOpacity>


              {
                password !== '' &&
                <View style={{ ...appStyles.spaceContainer, backgroundColor: "#f0f0f0" }}>
                  <Text style={appStyles.generatedPassword}
                    onLongPress={copyToClipboard}
                  >
                    {password}
                  </Text>
                  <Ionicons
                    name="clipboard"
                    size={24}
                    color="#fff"
                    style={appStyles.copyButton}
                    onPress={copyToClipboard}
                  />
                </View>
              }
            </SafeAreaView>
          </Root>
        )
          : <Text>Loading</Text>
      }
    </>
  )
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: '10%'
  },
  image: {
    width: 140,
    height: 140,
  },
  charLabel: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    maxHeight: 50,
    flexDirection: 'row',
    borderRadius: 10,
    flex: 1
  },
  slider: {
    width: '100%',
  },
  spaceContainer: {
    marginTop: 50,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  generatedPassword: {
    paddingLeft: 15,
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 20,
    flex: 1
  },
  copyButton: {
    flex: .25,
    backgroundColor: "#ffbb00",
    color: "#fff",
    height: "100%",
    textAlignVertical: 'center',
    textAlign: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  checkboxContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: 'rgba(0, 0, 0, .5)',
  },
})