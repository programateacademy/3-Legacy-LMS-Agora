import Swal from 'sweetalert2'

export const showErrMsg = (msg) => {
    Swal.fire({
    icon: 'warning',
    iconColor: "#ffd808",
    title: msg,
    showConfirmButton: true,
    timer:2500,
    timerProgressBar:true,
    confirmButtonText: "Entendido!", 
    confirmButtonColor:'#ffd808',
  })
}
export const showSuccessMsg  = (msg) => {
    Swal.fire({
    icon: 'success',
    title: msg,
    text:'Bienvenido!',
    showConfirmButton: true,
    timer:2500,
    timerProgressBar:true,
    confirmButtonText: "Entendido!", 
    confirmButtonColor:'#ffd808',
  })
}

export const showConfirmation = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      return true
    } else return false
  })
}