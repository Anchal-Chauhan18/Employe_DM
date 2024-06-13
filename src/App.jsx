import React,{ useState,useEffect } from 'react'
function App() {
  const url ="https://jsonplaceholder.typicode.com/users";
  const [data,setData] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [userId,setUserId] = useState(null);

const getAPIData = async ()=>{
   // api call
let result = await fetch(url)
result = await result.json();
setData(result);
setName(result.name);
setEmail(result.email);
setCity(result.city);
setUserId(result.id);
}

const selectUser = async(itemid)=>{
  let item = data[itemid-1];
  setName(item.name);
  setCity(item.address.city);
  setEmail(item.email);
  setUserId(item.id);
}

const updateUser = async (e)=>{
  e.preventDefault();
let item = {name, email, city, userId};
  let result = await fetch((`${url}/${userId}`),{
    method:'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({item})
  }).then(result=>{
    debugger;
    console.log(result);
    data[userId-1] = item;
    let newData = [...data];
    setData(newData);
  });

}

const deleteUser = async (id) =>{

 await fetch(`${url}/${id}`,{
  method:'DELETE'
 }).then((result)=>{
  let newData = data.filter(item=> item.id !==id);
  setData(newData);})

 }

 useEffect(()=>{getAPIData()},[])

  return (
    <>
     <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">City</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { 
  data && data.length > 0 ?( data.map((item)=>(
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item?.address?.city || item.city}</td>
      <td >
      <button type="button" className="btn btn-info" onClick ={()=>{selectUser(item.id)}}>Update</button>
      <button type="button" className="btn btn-danger" onClick ={()=>{deleteUser(item.id)}}>Delete</button>
      </td>
    </tr>)
  ))
  :null
 }
 </tbody>
</table>
<div style={{margin:"10px 20px"}}>
  <label htmlFor="name" style={{margin:"10px 20px"}}>Name:<input type="text" value={name} onChange={(e)=>{setName(e.target.value)} } /> <br /></label>  

  <label htmlFor="email" style={{margin:"10px 20px"}}>Email:<input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} /> <br /></label> 
  
  <label htmlFor="city" style={{margin:"10px 20px"}}>City: <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}}/> <br /></label>
 
  <button type="button" style={{margin:"10px 20px"}} className="btn btn-info" onClick ={(e)=>{updateUser(e)}}>Update User</button>

</div>
    </>
  )
}
export default App;