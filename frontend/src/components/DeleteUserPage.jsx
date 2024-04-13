
const DeleteUserPage = (props) => {

   function deleteUser(){
        //deletes user account from database
        props.deleteUser();
   }

    return (
        <>
            <tr>Do you want to delete your user account?</tr> 
            <tr>
                <td><button className="btn btn-danger" background-color="#FF0000" 
                    onClick={() => deleteUser("#FF0000")}>Delete account</button></td>
            </tr>
        </>
    )

}


export default DeleteUserPage;