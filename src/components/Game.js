import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(8),
        },
    },
}));


export default function Game(props) {
    
    const classes = useStyles();

    return (

        <div className="game-container">
            <Card className={classes.root}>
                
                <CardContent
                
                    align="center"
                >
                    <div>
                        <Typography gutterBottom variant="h4"></Typography>
                    </div>
                    <div>
                        <Typography gutterBottom variant="h3">{props.countryObj.name}</Typography>
                    </div>
                    <ButtonGroup className="buttons"
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical contained primary button group"
                        variant="contained">
                        {props.capitals.map((option, i) => <Button id="button" onClick={() => props.checkAnswer(option)}>{option !== "" ? option : "No capital"}</Button>)}
                    </ButtonGroup>
                    <Typography variant="h5">Your score:</Typography>
                    <Typography variant="h3">{props.score}</Typography>
                    <Typography variant="h4">{props.finalMessage}</Typography>

                </CardContent>

            </Card>
        </div>
    );
}