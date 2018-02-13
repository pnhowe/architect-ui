export function parseId (data) {
  // convert string to array or keep array
  let array = [].concat(data),
      output = []

  array.forEach(item => {
    let id = item.split(':')[1]
    output = output.concat(id)
  })

  return output
}

export function objToArr(obj, idKey) {
  const output = []

  for (const key in obj) {
    // add the object's key as property
    obj[key][idKey] = key
    // push object to output array
    output.push(obj[key])
  }

  return output
}
