function setJson(json, key, value) {
    let keys = key.split(".");
  
    if (keys.length > 1) {
      if (!isNaN(keys[0])) {
        json[parseInt(keys[0])] = setJson(
          json[parseInt(keys[0])],
          key.replace(`${keys[0]}.`, ""),
          value
        );
      } else {
        json[keys[0]] = setJson(
          json[keys[0]],
          key.replace(`${keys[0]}.`, ""),
          value
        );
      }
    } else {
      json[key] = value;
    }
  
    return json;
  }
  
  export {setJson}