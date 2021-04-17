import { useState } from 'react';
import { useHistory } from 'react-router';
import adsService from '../../services/ads-services';

const validations = {
  title: (value) => {
    let message;
    if (!value) {
      message = 'Title is required';
    } else if (value && value.length < 5) {
      message = 'Title needs at least 5 characters'
    }
    return message;
  },
  description: (value) => {
    let message;
    if (!value) {
      message = 'Description is required';
    } else if (value && value.length < 10) {
      message = 'Description needs at least 10 characters'
    }
    return message;
  }  
}

function AdForm({ event: eventToEdit = {} }) {

  const history = useHistory();
  const [state, setState] = useState({
    event: {
      title: '',
      description: '',
      ...eventToEdit
    },
    errors: {
      title: validations.title(eventToEdit.title),
      description: validations.description(eventToEdit.description)      
    },
    touch: {}
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (event.target.files) {
      value = event.target.files[0]
    }

    setState(state => {
      return {
        ...state,
        event: {
          ...state.event,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value),
        }
      }
    });
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid()) {
      try {
        const eventData = {...state.event};
        eventData.location = [Number(eventData.longitude), Number(eventData.latitude)];
        eventData.tags = eventData.tags.split(',').map(tag => tag.trim()) || [];
        const event = eventData.id ? await adsService.update(eventData) : await adsService.create(eventData);
        history.push(`/events/${event.id}`);
      } catch(error) {
        const { message, errors } = error.response?.data || error;

        if (errors?.location) {
          errors.latitude = errors.location;
          errors.longitude = errors.location;
          delete errors.location;
        }

        setState(state => ({
          ...state,
          errors: {
            ...errors,
            title: !errors && message
          },
          touch: {
            ...errors,
            title: !errors && message
          }
        }));
      }
    }
  }

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const { event, errors, touch } = state;

  return (
    <div className="row row-cols-1">
      <div className="col text-center mb-2">
        <img className="img-fluid img-thumbnail" src={event.image} alt={event.title} onError={(event) => event.target.src = 'https://via.placeholder.com/800x400'} />
      </div>
      <div className="col">
        <form onSubmit={handleSubmit}>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="title" className={`form-control ${(touch.title && errors.title) ? 'is-invalid' : ''}`} placeholder="Event title..."
              value={event.title} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.title}</div>
          </div>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-edit fa-fw"></i></span>
            <textarea name="description" className={`form-control ${(touch.description && errors.description) ? 'is-invalid' : ''}`} placeholder="Event description..."
              value={event.description} onBlur={handleBlur} onChange={handleChange}></textarea>
            <div className="invalid-feedback">{errors.description}</div>
          </div>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-users fa-fw"></i></span>
            <input type="number" name="capacity" className={`form-control ${(touch.capacity && errors.capacity) ? 'is-invalid' : ''}`} placeholder="Event capacity..."
              value={event.capacity} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.capacity}</div>
          </div>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-picture-o fa-fw"></i></span>
            <input type="file" name="image" className={`form-control ${(touch.image && errors.image) ? 'is-invalid' : ''}`} placeholder="Event image..."
              onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.image}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-globe fa-fw"></i></span>
            
            <span className="input-group-text">Latitude</span>
            <input name="latitude" type="number" className={`form-control ${(touch.latitude && errors.latitude) ? 'is-invalid' : ''}`} 
              value={event.latitude} onBlur={handleBlur} onChange={handleChange}/>

            <span className="input-group-text">Longitude</span>
            <input name="longitude" type="number" className={`form-control ${(touch.longitude && errors.longitude) ? 'is-invalid' : ''}`} 
              value={event.longitude} onBlur={handleBlur} onChange={handleChange} />
            
            {touch.latitude && errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
            {touch.longitude && errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-clock-o fa-fw"></i></span>
            
            <span className="input-group-text">Start</span>
            <input type="datetime-local" name="start" className={`form-control ${(touch.start && errors.start) ? 'is-invalid' : ''}`} placeholder="dd/mm/yyyy hh:mm"
              value={event.start} onBlur={handleBlur} onChange={handleChange} />

            <span className="input-group-text">End</span>
            <input name="end" type="datetime-local" className={`form-control ${(touch.end && errors.end) ? 'is-invalid' : ''}`} placeholder="dd/mm/yyyy hh:mm"
              value={event.end} onBlur={handleBlur} onChange={handleChange} />
            
            {touch.start && errors.start && <div className="invalid-feedback">{errors.start}</div>}
            {touch.end && errors.end && <div className="invalid-feedback">{errors.end}</div>}
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="tags" className={`form-control ${(touch.tags && errors.tags) ? 'is-invalid' : ''}`} placeholder="Coma separated event tags..."
              value={event.tags} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.tags}</div>
          </div>
          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={!isValid()}>
              {event.id && <span>Update Event</span>}
              {!event.id && <span>Create Event</span>}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default AdForm;
