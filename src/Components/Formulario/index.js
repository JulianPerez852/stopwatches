import React from 'react';

function ActivityForm (props) {
    const { constants, activity, project, handlerActivity, handlerProject, handlerSubmit, handlerClose, showEdit}= props;
    return(
            <div className='container'>
                <span onClick={()=>handlerClose()}>Cerrar</span>
                <form onSubmit={(e)=>handlerSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="activity">Actividad</label>
                        <input id={constants.ACTIVITY} type="text" value={activity} className="form-control" name="activity" onChange={(e)=>handlerActivity(e)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="project">Proyecto</label>
                        <input id={constants.PROJECT} type="text" value={project} className="form-control" name="project" onChange={(e)=>handlerProject(e)} />
                    </div>

                    <div className="action">
                        {showEdit 
                            ? 
                                <button type="submit" className="btn btn-primary">Editar cronómetro</button>
                            :
                                <button type="submit" className="btn btn-primary">Crear cronómetro</button>
                        }
                    </div>
                </form>
            </div>
    );
}

export default ActivityForm;