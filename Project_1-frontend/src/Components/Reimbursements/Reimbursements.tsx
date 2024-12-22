import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"

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

    const getAllReimbursements = async () =>{

        //axios Get Response

        const response = await axios.get(
            "http://localhost:4444/reimbursement")

            setReimbursements(response.data)

            console.log(response.data)
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
                                <Button className="btn-danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}