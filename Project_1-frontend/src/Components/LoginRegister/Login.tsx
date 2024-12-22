import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Login:React.FC =  () =>{

    const navigate = useNavigate()

    return(
        <Container>
            <h3>Login</h3>

            <Button onClick={()=>navigate("/reimbursements")}>Login</Button>
            <Button onClick={()=>navigate("/register")}>Register</Button>
        </Container>
    )
}