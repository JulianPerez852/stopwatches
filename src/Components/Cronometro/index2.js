import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class Cronometro extends React.Component {

    millisecondsToHuman(ms) {
        const centiseconds = Math.floor((ms / 10) % 100);
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms / 1000 / 60 / 60);
    
        const humanized = [
          this.pad(hours.toString(), 2),
          this.pad(minutes.toString(), 2),
          this.pad(seconds.toString(), 2),
          this.pad(centiseconds.toString(), 2),
        ].join(':');
    
        return humanized;
    }

    pad(numberString, size) {
        let padded = numberString;
        while (padded.length < size) padded = `0${padded}`;
        return padded;
    }

    startChrono(){
        this.incrementer=setInterval(()=>{
            this.props.handlerTime();
        },100);          
    }

    stopChrono(){
        clearInterval(this.incrementer);
        this.props.handlerStopTime();
    }

    handleDelete(){
        this.stopChrono()
        this.props.deleteActivity()
    }

    componentDidUpdate(prevProps){
        if (prevProps.activity.id !== this.props.activity.id ) {
            this.setNewInterval()
        }
    }

    setNewInterval(){
        if(this.props.activity.status === 'stop'){
            this.startChrono()
        }
    }

    componentWillUnmount(){
        clearInterval(this.incrementer);
    }

    render(){
        const { activity, openEditActivitie}=this.props;
        return(
                <Card p={2} width="70%">
                    <Box p={2} bgcolor="grey.200">
                        <CardContent>
                            <CardActions flexWrap="wrap">
                                <Box width="50%">
                                    <Button onClick={()=>openEditActivitie()} size="small" color="primary">Editar</Button>
                                </Box>
                                <Box width="50%">
                                    <Button onClick={()=>this.handleDelete()} size="small" color="secondary">Eliminar</Button>
                                </Box>
                            </CardActions>
                            <h2>{activity.activity}</h2>
                            <Typography>{activity.project}</Typography>
                            <h2>{this.millisecondsToHuman(activity.ms)}</h2> 
                            <Button 
                                onClick={activity.status=== 'start' ? ()=>this.startChrono() : ()=>this.stopChrono()} 
                                variant="contained" color={activity.status=== 'start' ? "primary": "secondary"}
                                style={activity.status==='start'?{backgroundColor: "green"}:{backgroundColor: "red"}}
                                >{activity.status}</Button>
                        </CardContent>
                    </Box>
                </Card>
        );
    }
}


export default Cronometro;