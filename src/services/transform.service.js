export class TransformService {
  constructor() {

  }

  static fbObjectToArray(fbData) {
    return Object.keys(fbData).map(key => {
      let item = fbData[key]
      item.id = key
      return item
    })
  }
}
