import * as SecureStore from 'expo-secure-store'

async function setValue (key, obj) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(obj))
  } catch (err) {
    console.log('secure set error: ', err)
  }
}

async function getValue (key) {
  try {
    let data = await SecureStore.getItemAsync(key)
    if (data !== undefined) {
      return JSON.parse(data)
    }
  } catch (err) {
    console.log('secure get error: ', err)
  }
}

const deleteValue = async key => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (err) {
    console.log('secure delete error: ', 'error')
  }
}

export default { setValue, getValue, deleteValue }