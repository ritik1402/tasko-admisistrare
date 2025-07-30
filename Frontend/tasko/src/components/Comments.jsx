import React,{useEffect} from 'react'
import commentServices from '../services/commentServices.js';

const Comments = () => {

    useEffect(()=>{
        const getComments = async () => {
            try {
                const response = await commentServices.getComments();
                console.log(response.data);
            }
    })


  return (
    <div>
      Comment For :-
      <Select>

      </Select>
          </div>
  )
}

export default Comments
