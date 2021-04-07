import './App.css';
import axios from 'axios'
import {useEffect, useState} from "react";
import {Container, Header, Input, Button} from "semantic-ui-react";

function App() {

  const [data, setData] = useState("")
    const [input, setInput] = useState("")

    const onChangeInput = (event) =>{
      setInput(event.target.value);
    }

    const onClickGetSentiment = async () =>{
      if(input === "") return
      try{
          await axios.post('https://dat255sentiment-backend.herokuapp.com/sentiment', {"sentence": input})
              .then(response => setData(response.data.sentiment))
      }catch(e){
          throw e
      }
    }

  return (
      <Container textAlign='center'>
        <Header as='h1' style={{marginTop:'200px'}}>
          Sentiment application
            <Header.Subheader>
                Enter a Twitter username
            </Header.Subheader>
        </Header>
          <Input
              placeholder='Username'
              onChange={(e) => {onChangeInput(e)}}
          ></Input>
          <Button
              primary
              onClick={() => onClickGetSentiment()}
          >Get sentiment</Button>

          <Header>{data}</Header>
        </Container>
  );
}

export default App;
