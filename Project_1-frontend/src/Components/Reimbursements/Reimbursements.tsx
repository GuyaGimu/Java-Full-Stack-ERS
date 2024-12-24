import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface Reimbursements{
    reimbId:number,
    description:String,
    amount:number,
    status:String
}
export const Reimbursements:React.FC = () =>{

    const [reimbursements, setReimbursements] = useState
    <Reimbursements[]>([])
    useEffect( ()=>{
        getAllReimbursements()
    },[])

    //useNavigate hook so we can change the URL as needed 

    const navigate  = useNavigate();

    const getAllReimbursements = async () =>{

        //axios Get Response

        const response = await axios.get(
            "http://localhost:4444/reimbursement")

            setReimbursements(response.data)

            console.log(response.data)
    }
    const deleteReimbursement= (reimbId:number) =>{

        alert("Reimbursement" + reimbId)
    }
    
    return(
        <Container>
            <h3>Reimbursements</h3>

            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripion</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursements:Reimbursements) =>(
                        <tr>
                            <td>{reimbursements.reimbId}</td>
                            <td>{reimbursements.description}</td>
                            <td>{reimbursements.amount}</td>
                            <td>{reimbursements.status}</td>
                            <td>
                                <Button className="btn-danger" onClick={ () =>{deleteReimbursement(reimbursements.reimbId)}}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button className="btn-info" onClick={() =>{navigate("/manager-dashboard")}}>Back</Button>
        </Container>
    )
}