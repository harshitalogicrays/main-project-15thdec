let arr = [
    {id:1,name:"aaa",add:"ccc",status:"good"},
    {id:2,name:"aaa",add:"ccc",status:"good"},
    {id:3,name:"aaa",add:"ccc",status:"good"},
    {id:4,name:"aaa",add:"ccc",status:"good"},
    {id:5,name:"aaa",add:"ccc",status:"good"}
    ]
    
    let newarr=arr.filter((item,i,self)=>{
    return i % 2 == 0 
    })

    let newarr1=newarr.map((item)=>item.id)
    console.log(newarr1)