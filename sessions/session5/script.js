
fetch(myURL)
  .then(response => response.json())
  .then(data => console.log(data))


const getData = async()=>{
  let myData = await axios.get(myURL)
  console.log(myData)
}