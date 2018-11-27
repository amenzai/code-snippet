import storage from 'good-storage'

const state = {
  userId: storage
    .session
    .get(__uid__, ''),
  userInfo: storage
    .session
    .get(__userinfo__, {})
}

export default state