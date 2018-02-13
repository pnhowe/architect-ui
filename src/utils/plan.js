import axios from 'axios'
import * as util from './common'
import { architect } from '../config/architect.js'

export default class Plan {

  constructor(planObj) {
    this.instances = []
    this.actions = []
    this.complexes = []
    this.bluePrints = []
    this.complexGraphs = []

    for (const prop in planObj) {
      this[prop] = planObj[prop]
    }
  }

  static async listPlans () {

    const req = await axios({
        method: 'LIST',
        url: `${architect.baseUrl}/Plan/Plan`,
        headers: architect.headers
      }),
      idArray = util.parseId(req.data)

    return idArray

  }

  async _listInstances () {

    const req = await axios({
      method: 'LIST',
      url: `${architect.baseUrl}/Builder/Action`,
      data: { 'plan': `/api/v1/Plan/Plan:${this.id}:`},
      headers: architect.headers
    })

    return req.data

  }

  async _listActions () {

    const req = await axios({
      method: 'LIST',
      url: `${architect.baseUrl}/Builder/Instance`,
      data: { 'plan': `/api/v1/Plan/Plan:${this.id}:`},
      headers: architect.headers
    })

    return req.data

  }

  async _listComplexes () {

    const req = await axios({
      method: 'LIST',
      url: `${architect.baseUrl}/Plan/PlanComplex`,
      data: { 'plan': `/api/v1/Plan/Plan:${this.id}:`},
      headers: architect.headers
    })

    return req.data

  }

  async _listBluePrints () {

    const req = await axios({
      method: 'LIST',
      url: `${architect.baseUrl}/Plan/PlanBluePrint`,
      data: { 'plan': `/api/v1/Plan/Plan:${this.id}:`},
      headers: architect.headers
    })

    return req.data

  }

  static async getPlans (idArr) {

    const idString = idArr.join(':'),
        req = await axios({
        method: 'GET',
        url: `${architect.baseUrl}/Plan/Plan:${idString}:`,
        headers: architect.headers
      }),
      plansArr = util.objToArr(req.data, 'id')

    return plansArr

  }

  async getInstances () {

    const idArr = await this._listInstances(),
      parsedIdArr = util.parseId(idArr),
      idString = parsedIdArr.join(':'),
      req = await axios({
        method: 'GET',
        url: `${architect.baseUrl}/Builder/Instance:${idString}:`,
        headers: architect.headers
      }),
      instancesArr = util.objToArr(req.data, 'id')

    this.instances = instancesArr

    return this.instances

  }

  async getActions () {

    const idArr = await this._listActions(),
      parsedIdArr = util.parseId(idArr),
      idString = parsedIdArr.join(':'),
      req = await axios({
        method: 'GET',
        url: `${architect.baseUrl}/Builder/Action:${idString}:`,
        headers: architect.headers
      }),
      actionsArr = util.objToArr(req.data, 'id')

    this.actions = actionsArr

    return this.actions

  }

  async getComplexes () {

    const idArr = await this._listComplexes(),
      parsedIdArr = util.parseId(idArr),
      idString = parsedIdArr.join(':'),
      req = await axios({
        method: 'GET',
        url: `${architect.baseUrl}/Plan/PlanComplex:${idString}:`,
        headers: architect.headers
      }),
      complexesArr = util.objToArr(req.data, 'id')

    this.complexes = complexesArr

    return this.complexes

  }

  async getBluePrints () {

    const idArr = await this._listBluePrints(),
      parsedIdArr = util.parseId(idArr),
      idString = parsedIdArr.join(':'),
      req = await axios({
        method: 'GET',
        url: `${architect.baseUrl}/Plan/PlanBluePrint:${idString}:`,
        headers: architect.headers
      }),
      bluePrintsArr = util.objToArr(req.data, 'id')

    this.bluePrints = bluePrintsArr

    return this.bluePrints

  }

  async callComplex () {

    const idArr = await this._listComplexes(),
      parsedIdArr = util.parseId(idArr)

    for (const id of parsedIdArr) {

      const req = await axios({
        method: 'CALL',
        url: `${architect.baseUrl}/Plan/PlanComplex:${id}:(graph_data)`,
        data: { 'duration': '3600' },
        headers: architect.headers
      }),
      complexesObj = req.data[`/api/v1/Plan/PlanComplex:${id}:`]

      complexesObj.name = id
      this.complexGraphs.push(complexesObj)

    }

    return this.complexGraphs

  }

}
