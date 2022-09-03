import { useFormik } from 'formik';
import React from 'react';

export default React.memo(function ProfileForm(){
    const formik = useFormik({
        initialValues:{

        },
        onSubmit:{

        }
    })
   return(
       <>
       <form onSubmit={(e)=>{e.preventDefault();formik.handleSubmit()}}>

       </form>
       </>
   )
})