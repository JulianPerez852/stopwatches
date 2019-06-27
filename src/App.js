import React from 'react';
import './App.css';
import Cronometro from './Components/Cronometro/index2';
import ActivityForm from './Components/Formulario/index';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      activities: [],
      showForm: false,
      activity: '',
      project: '',
    }
    this.constants={ACTIVITY: 'activity', PROJECT: 'project',};
    this.handlerActivity = this.handlerActivity.bind(this);
    this.handlerProject = this.handlerProject.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.handlerClose = this.handlerClose.bind(this);
    this.editActivity = this.editActivity.bind(this);
    this.editProject = this.editProject.bind(this);
    this.editChange = this.editChange.bind(this);
    this.editClose = this.editClose.bind(this);
    this.openEditActivitie = this.openEditActivitie.bind(this);
    this.handlerTime = this.handlerTime.bind(this);
    this.handlerStopTime = this.handlerStopTime.bind(this);
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
    const { activity, project, activities } = this.state;
    const lengthListado = activities.length;
    const newActivity = {
      id: lengthListado + 1,
      activity,
      project,
      ms: 0,
      status: 'start',
      showEdit: false,
    }
    this.state.activities.push(newActivity)
    this.setState({
      activity: '',
      project: '',
      activities,
      showForm: false,
    });
  }

  deleteActivity(id){
    const { activities }=this.state;
    const newActivities = activities.filter(objeto=> objeto.id !== id);
    this.setState({
      activities: newActivities,
    });
  }

  handlerClose(){
    this.setState({showForm: false,});
  }

  editActivity(e, id){
    this.editChange(this.constants.ACTIVITY, e.target.value, id);
  }

  editProject(e, id){
    this.editChange(this.constants.PROJECT, e.target.value, id);
  }

  editChange(prop, value, id){
    const { activities }=this.state;
    const resultado=activities.find(objeto=> objeto.id === id);
    resultado[prop]= value;
    this.setState({
      activities,
    });
  }

  editSubmit(e, id){
    e.preventDefault();
    const { activities }=this.state;
    const resultado=activities.find(objeto=> objeto.id === id);
    resultado.showEdit = false;
    this.setState({
      activities,
    });
  }

  editClose(id){
    const { activities }=this.state;
    const resultado=activities.find(objeto=> objeto.id === id);
    resultado.showEdit = false;
    this.setState({
      activities,
    });
  }

  openEditActivitie(id){
    const { activities }=this.state;
    const resultado=activities.find(objeto=> objeto.id === id);
    resultado.showEdit = true;
    this.setState({
      activities,
    });
  }

  handlerTime(id){
    const { activities }=this.state;
    const resultado=activities.find(objeto=> objeto.id === id);
    resultado.ms = resultado.ms+100;
    if (resultado.status=== 'start'){resultado.status = 'stop'}
    this.setState({
      activities,
    });
  }

  handlerStopTime(id){
    const { activities }=this.state;
    const resultado=activities.find(objeto=> objeto.id === id);
    resultado.status = 'start';
    this.setState({
      activities,
    });
  }

  render(){
    const { activities, showForm, activity, project }=this.state;
    
    return (
      <div className="App">
        <h1>Cronómetros</h1>
        <hr></hr>
        <div className=''>
          {activities.map((actividad,index)=>
              actividad.showEdit ?
                  <ActivityForm
                    key={index}
                    constants={this.constants}
                    activity={actividad.activity}
                    project={actividad.project}
                    showEdit={actividad.showEdit}
                    handlerActivity={(e)=>this.editActivity(e , actividad.id)}
                    handlerProject={(e)=>this.editProject(e, actividad.id)}
                    handlerSubmit={(e)=>this.editSubmit(e, actividad.id)}
                    handlerClose={()=>this.editClose(actividad.id)}
                  >
                  </ActivityForm>
                :
                  <div key={index}>
                    <Cronometro 
                      key={index}
                      activity={actividad} 
                      openEditActivitie={()=>this.openEditActivitie(actividad.id)}
                      deleteActivity={()=>this.deleteActivity(actividad.id)}
                      handlerTime={()=>this.handlerTime(actividad.id)}
                      handlerStopTime={()=>this.handlerStopTime(actividad.id)}
                      ></Cronometro>
                    <br></br>
                  </div>
              )
          }
          {showForm 
            ? 
              <ActivityForm
                constants={this.constants}
                activity={activity}
                project={project}
                handlerActivity={(e)=>this.handlerActivity(e)}
                handlerProject={(e)=>this.handlerProject(e)}
                handlerSubmit={(e)=>this.handlerSubmit(e)}
                handlerClose={()=>this.handlerClose()}
                showEdit={false}
              ></ActivityForm>
            : 
              <span onClick={()=>this.setState({showForm: true,})}>Agregar</span>
          }
        </div>
      </div>
    );
  }
}

export default App;
