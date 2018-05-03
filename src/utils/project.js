import axios from 'axios'
import * as util from './common'
import { architect } from '../config/architect.js'

export default class Project {

  constructor(projectObj) {
    for (const prop in projectObj) {
      this[prop] = projectObj[prop]
    }
  }

  static async rescan () {

    const req = await axios({
        method: 'CALL',
        url: `${architect.baseUrl}/Project/Loader(rescan)`,
        headers: architect.headers
      }),
      idArray = util.parseId(req.data)

    return idArray

  }

  static async listChanges () {

    const req = await axios({
        method: 'LIST',
        url: `${architect.baseUrl}/Project/Change`,
        headers: architect.headers
      }),
      idArray = util.parseId(req.data)

    return idArray

  }

  static async getChanges (idArr) {
    if (idArr.length == 0 ){
      return []
    }

    const idString = idArr.join(':'),
        req = await axios({
        method: 'GET',
        url: `${architect.baseUrl}/Project/Change:${idString}:`,
        headers: architect.headers
      }),
      changesArr = util.objToArr(req.data, 'id')

    return changesArr

  }

  static async applyChange (id) {
    id = util.parseId(id) // TODO: parse out the id in the getChanges
    let headers = Object.assign({}, architect.headers)
    headers[ 'Multi-Object' ] = false
    try {
      const req = await axios({
          method: 'CALL',
          url: `${architect.baseUrl}/Project/Change:${id}:(apply)`,
          headers: headers
        }),
        results = req.data

      return results
    } catch (e) {
      return e
    }
  }

}
