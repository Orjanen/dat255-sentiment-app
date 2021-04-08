import React from 'react';
import {Card, Icon, Button, Header} from 'semantic-ui-react'

const TweetCard = (props) => {

    const transformSentiment = (sentiment)=> {
        if (sentiment === 1){
            return 'Positive'
        }else if(sentiment === 0){
            return 'Neutral'
        }else {
            return 'Negative'
        }
    }

    const name = props.name
    return (
        <Card style={{marginTop:"20px"}}>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{props.date}</Card.Meta>
                <Card.Description>
                    {props.tweets}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a style={{marginRight:"10px"}}>
                    <Icon name='heart' />
                    {`${props.likes} Likes`}
                </a>
                <a>
                    <Icon name='redo' />
                    {`${props.likes} Retweets`}
                </a>
            </Card.Content>
            <Card.Content extra>
                <Header as='h5'>{`We belive the sentiment is ${transformSentiment(props.sentiment)}`}</Header>
                <Button.Group>
                    <Button   color='green'> Agree</Button>
                    <Button basic negative> It's Wrong</Button>
                </Button.Group>
            </Card.Content>

        </Card>
    );
}

export default TweetCard;