import { useState } from 'react';
import { useHistory } from 'react-router';
import adsService from '../../services/ads-services';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';

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
  },
  image: (value) => {
    let message;
    if (!value) {
      message = 'Image is required';
    }
    return message;
  }
}

function AdForm({ ad: adToEdit = {} }) {

  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [state, setState] = useState({
    ad: {
      title: '',
      description: '',
      image: '',      
      author: user.id,
      applied: [],
      results: [],
      ...adToEdit
    },
    errors: {
      title: validations.title(adToEdit.title),
      description: validations.description(adToEdit.description),
      image: validations.image(adToEdit.image)
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
        ad: {
          ...state.ad,
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
        const adData = {...state.ad};
        console.log('contenido del Ad => ', adData);
        const ad = adData.id ? await adsService.update(adData) : await adsService.create(adData);
        history.push(`/ads/${ad.id}`);
      } catch(error) {
        const { message, errors } = error.response?.data || error;

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

  const { ad, errors, touch } = state;

  return (
    <div className="row row-cols-1">
      <div className="col text-center mb-2">
        <img className="img-fluid img-thumbnail" src={ad.image} alt={ad.title} onError={(ad) => ad.target.src = 'https://via.placeholder.com/800x400'} />
      </div>
      <div className="col">
        <form onSubmit={handleSubmit}>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="title" className={`form-control ${(touch.title && errors.title) ? 'is-invalid' : ''}`} placeholder={t('AdsForm.title')}
              value={ad.title} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.title}</div>
          </div>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-edit fa-fw"></i></span>
            <textarea name="description" className={`form-control ${(touch.description && errors.description) ? 'is-invalid' : ''}`} placeholder={t('AdsForm.description')}
              value={ad.description} onBlur={handleBlur} onChange={handleChange}></textarea>
            <div className="invalid-feedback">{errors.description}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-picture-o fa-fw"></i></span>
            <input type="file" name="image" className={`form-control ${(touch.image && errors.image) ? 'is-invalid' : ''}`} placeholder="Event image..."
              onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.image}</div>
          </div>

          <div className="input-group mb-2">
            <input type="checkbox" name="open" /> <span className="input-group-text">{t('AdsForm.open')}</span>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={!isValid()}>
              {ad.id && <span>Update ad</span>}
              {!ad.id && <span>Create ad</span>}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default AdForm;
