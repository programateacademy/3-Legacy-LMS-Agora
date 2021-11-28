import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

const Deliverie = () => {
  const [deliverie, setDeliverie]= useState()
  const {id_deliverie} = useParams()

  // useEffect(() => {
  //   if (isAdmin) {
  //     console.log("SI");
  //     fetchAllUsers(token).then((res) => {
  //       dispatch(dispatchGetAllUsers(res));
  //     });
  //   }
  // }, [token, isAdmin, dispatch, callback]);

  useEffect(() => {
    const fetchDeliver = async () => {
    const res = await axios.get(`/api/agora/get-deliverie/${id_deliverie}`)
    setDeliverie(res.data)
    }
    fetchDeliver()
  }, [id_deliverie])

  return (
    <div>
      ENTREGA 1 DELIVERIE
      {console.log(deliverie.competencies.outcomes)}
    </div>
  )
}

export default Deliverie
