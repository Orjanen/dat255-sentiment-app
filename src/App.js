import './App.css';
import axios from 'axios'
import {useState} from "react";
import {Button, Container, Grid, Header, Input} from "semantic-ui-react";
import TweetCard from "./components/TweetCard";

function App() {


    const [data, setData] = useState("")
    const [input, setInput] = useState("")
    const [tweets, setTweets] = useState([])

    const onClickGetSentiment = async () => {
        const data = []
        try {
            await axios.post('https://dat255sentiment-backend.herokuapp.com/gettweets', {"name": input})
                .then(response => {
                    for(let i in response.data) {
                        data.push(response.data[i])
                    }
                })
            setTweets(data)
        } catch (e) {
            throw e
        }
    }

    const onChangeInput = (event) => {
        setInput(event.target.value);
    }

    return (
        <Container textAlign='center'>
            <Header as='h1' style={{marginTop: '200px'}}>
                Sentiment application
                <Header.Subheader>
                    Enter a Twitter username
                </Header.Subheader>
            </Header>
            <Input
                placeholder='Username'
                onChange={(e) => {
                    onChangeInput(e)
                }}
            ></Input>
            <Button
                primary
                onClick={() => onClickGetSentiment()}
            >Get sentiment</Button>

            <Header>{data}</Header>
            <Grid columns='equal'>
                <Grid.Row columns={4}>
                    {tweets.map(item => {
                        return (
                            <Grid.Column key={item.id}>
                                <TweetCard
                                    name={input}
                                    tweets={item.tweets}
                                    likes={item.likes}
                                    retweet={item.retweet}
                                    sentiment={item.sentiment}
                                />

                            </Grid.Column>
                        )
                    })}
                </Grid.Row>
            </Grid>

        </Container>
    );
}

export default App;
