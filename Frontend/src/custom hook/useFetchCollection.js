//custom hook -  we can use builtin hooks 
// normal function which will return something (string,array, object etc.)

import { QuerySnapshot, collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'

const useFetchCollection = (collectionname) => {
    let [data,setData]=useState([])
    let [isLoading,setIsLoading]=useState(false)

    let getCollectionData=async()=>{
        setIsLoading(true)
        try{
            const docRef=collection(db,collectionname)     
            const q = query(docRef, orderBy('createdAt','desc'));
            onSnapshot(q,(docSnap)=>{
                let arr= docSnap.docs.map((doc) => ({...doc.data(),id:doc.id})
                );
                setData(arr)
            })
         
            setIsLoading(false)
           }
        catch(error){setIsLoading(false);toast.error(error.message)}    
    }
    useEffect(()=>{getCollectionData()},[])
    return {data,isLoading} 
}

export default useFetchCollection
