import { create } from 'zustand'
import api from './api'
import storage from './storage'
import { jwtDecode } from 'jwt-decode'

const useGlobal = create(set => ({
  //Loading
  message: false,

  //Loading
  loading: false,

  load: val => {
    set(state => ({
      loading: val
    }))
  },
  // Bottomsheet
  bottomSheet: false,
  setBottomSheet: val => {
    set(state => ({
      bottomSheet: val
    }))
  },
  // Initialization
  initialized: false,
  authenticated: false,
  user: {},
  tokens: {},

  // Initialize by fetching data
  login: (credentials, tokens) => {
    storage.setValue('credentials', credentials)
    storage.setValue('tokens', tokens)
    const user = jwtDecode(tokens.access)

    set(state => ({
      authenticated: true,
      user: user,
      tokens: tokens
    }))
  },
  logout: () => {
    storage.deleteValue('credentials')
    storage.deleteValue('tokens')
    set(state => ({
      authenticated: false,
      user: {}
    }))
  },
  init: async () => {
    const credentials = await storage.getValue('credentials')
    if (credentials) {
      try {
        const response = await api.post('login/', {
          email: credentials.email,
          password: credentials.password
        })

        if (response.status !== 200) {
          throw 'Authentication error!'
        }

        const tokens = response.data
        const user = jwtDecode(tokens.access)

        storage.setValue('tokens', tokens)

        set(state => ({
          initialized: true,
          authenticated: true,
          user: user,
          tokens: tokens
        }))
        return
      } catch (err) {
        console.log(err.message)
      }
    }
    set(state => ({
      initialized: true
    }))
  },
  // Bottomsheet
  bottomSheet: false,
  setBottomSheet: val => {
    set(state => ({
      bottomSheet: val
    }))
  },

  // Appointment Data

  selectedDoctor: null,
  setSelectedDoctor: val => {
    set(state => ({
      selectedDoctor: val
    }))
  },

  formData: {
    doctor: '',
    date: '',
    time: '',
    phone_no: '',
    caseInfo: ''
  },
  setFormData: val => {
    set(state => ({
      formData: val
    }))
  }
}))

export default useGlobal
