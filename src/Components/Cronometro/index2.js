import React from 'react';

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

    render(){
        const { activity, openEditActivitie}=this.props;
        return(
            <React.Fragment>
                <div className=''>
                    <span onClick={()=>openEditActivitie()}>Editar</span>
                    <span onClick={()=>this.handleDelete()}>Eliminar</span>
                    <h2>{activity.activity}</h2>
                    <h3>{activity.project}</h3>
                    <h2>{this.millisecondsToHuman(activity.ms)}</h2> 
                    <span onClick={activity.status=== 'start' ? ()=>this.startChrono() : ()=>this.stopChrono()}>{activity.status}</span>
                </div>
            </React.Fragment>

        );
    }
}


export default Cronometro;