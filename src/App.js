import './App.css';
import axios from 'axios'
import {useState} from "react";
import {Button, Container, Grid, Header, Input, Label} from "semantic-ui-react";
import TweetCard from "./components/TweetCard";

function App() {

    const [input, setInput] = useState("")
    const [tweets, setTweets] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onClickGetSentiment = async () => {
        const data = []
        try {
            setIsLoading(true)
            await axios.post('https://sentiment-application-dat255.herokuapp.com/gettweets', {"name": input})
                .then(response => {
                    for(let i in response.data) {
                        data.push(response.data[i])
                    }
                })
            setTweets(data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setError("We didn't find a user with this username")
        }
    }
    const onChangeInput = (event) => {
        setInput(event.target.value);
        setError("")
    }

    return (
        <Container textAlign='center'>
            <Header as='h1' style={{marginTop: '200px'}}>
                Sentiment application
                <Header.Subheader>
                    Enter a Twitter username
                </Header.Subheader>
                {error && <Label color='red'>{error}</Label>}
            </Header>
            <Input
                placeholder='Username'
                onChange={(e) => {
                    onChangeInput(e)
                }}
            ></Input>
            <Button
                loading={isLoading}
                primary
                onClick={() => onClickGetSentiment()}
            >Get sentiment</Button>

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
