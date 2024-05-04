import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Typography } from "@mui/material";

function Reset() {

  const [timer, setTimer] = useState(5)

    const navigate = useNavigate()

    useEffect(() => {
      let timerCount: any
      if (timer) {
        timerCount = setTimeout(() => {
          setTimer((t) => t - 1)
        }, 1000)
      }
      () => clearTimeout(timerCount)
    }, [timer])

    useEffect(() => {
      let timeout: any

      timeout = setTimeout(() => {
        navigate("/")
      }, 5000)
      return () => clearTimeout(timeout)
    }, [])
    
    return (
      <Container style={{paddingLeft: 0, marginTop: "0.5em"}}>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
        Oops... Unknown Endpoint.
        </Typography>
        <p>
          You will be redirected automatically back to the Homepage in <strong>{timer} seconds</strong>.
        </p>
      </Container>
    )
}

export default Reset