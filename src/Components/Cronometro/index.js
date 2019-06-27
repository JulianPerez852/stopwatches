import React from 'react';

class Cronometro extends React.Component{
    constructor(props){
        super(props);
        const cronometterData = this.createCronometer(this.props.activity);
        this.state= {
            ...cronometterData,
            status: 'start',
            showEdit: false,
            ms: 0,
        }
        this.constants={ ACTIVITY: 'activity', PROJECT: 'project' };
        this.handlerEdit = this.handlerEdit.bind(this);
        this.handlerActivity = this.handlerActivity.bind(this);
        this.handlerProject = this.handlerProject.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    createCronometer(activity) {
       return {
            activity: activity.activity,
            project: activity.project,
      };
    }

    updateState(activity) {
        const cronometterData = this.createCronometer(activity);
        this.setState({ ...cronometterData });
    }

    componentDidUpdate(prevProps) {
       if (prevProps.activity.id !== this.props.activity.id) {
          this.updateState(this.props.activity);
       }
    }

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
            this.setState({
                ms: this.state.ms + 100,
                status: 'stop'
            });
        },100);
    }

    stopChrono(){
        clearInterval(this.incrementer);
        this.setState({
            status: 'start',
        });
    }

    handlerEdit(){
        clearInterval(this.incrementer);
        this.setState({
            status: 'start',
            showEdit: true,
        });

    }

    handlerActivity(e) {
        this.handlerChange(this.constants.ACTIVITY, e.target.value);
    }
    
    handlerProject(e) {
        this.handlerChange(this.constants.PROJECT, e.target.value);
    }
    
    handlerChange(prop, value){
        this.setState({
          [prop]: value
        });
    }
    
    handlerSubmit(e){
      e.preventDefault();
        this.setState({
            showEdit: false,
        });
    }

    render(){
        const { ms, status, activity, project, showEdit } = this.state;
        return(
            <React.Fragment>
                {showEdit
                    ?
                    <div className='container'>
                        <span onClick={()=> this.setState({showEdit: false,})}>Cerrar</span>
                        <form onSubmit={this.handlerSubmit}>
                            <div className="form-group">
                                <label htmlFor="activity">Actividad</label>
                                <input id={this.constants.ACTIVITY} type="text" value={this.state.activity} className="form-control" name="activity" onChange={this.handlerActivity}/>
                            </div>
            
                            <div className="form-group">
                                <label htmlFor="project">Proyecto</label>
                                <input id={this.constants.PROJECT} type="text" value={this.state.project} className="form-control" name="project" onChange={this.handlerProject} />
                            </div>
            
                            <div className="action">
                                <button type="submit" className="btn btn-primary">Editar cronómetro</button>
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <span onClick={()=>this.handlerEdit()}>Editar</span>
                        <span onClick={()=>this.props.deleteActivity()}>Eliminar</span>
                        <h2>{activity}</h2>
                        <h3>{project}</h3>
                        <h2>{this.millisecondsToHuman(ms)}</h2> 
                        <span onClick={status==='start'?()=>this.startChrono():()=>this.stopChrono()}>{status}</span>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default Cronometro;