import { useState } from 'react';
import { useHistory } from 'react-router';
import messageService from '../../services/ads-services';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';

const validations = {
   text: (value) => {
    let message;
    if (!value) {
      message = 'text is required';
    }
    return message;
  }
}

function MessageBox({ message: messageToEdit = {} }) {

  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [state, setState] = useState({
    message: {
      text: '',
      creationDate: Date.now,
      author: user.id,
      ...messageToEdit
    },
    errors: {
        text: validations.text(messageToEdit.text)
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
        message: {
          ...state.message,
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
        const messageData = {...state.message};
        console.log('contenido del message => ', messageData);
        const message = messageData.id ? await messageService.update(messageData) : await messageService.create(messageData);
        history.push(`/messages/${message.id}`);
      } catch(error) {
        const { message, errors } = error.response?.data || error;

        setState(state => ({
          ...state,
          errors: {
            ...errors,
            text: !errors && message
          },
          touch: {
            ...errors,
            text: !errors && message
          }
        }));
      }
    }
  }

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const { message, errors, touch } = state;

  return (
    <div className="row row-cols-1">      
      <div className="col">
        <form onSubmit={handleSubmit}>
          
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="text" className={`form-control ${(touch.text && errors.text) ? 'is-invalid' : ''}`} placeholder={t('MessageBox.text')}
              value={message.text} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.text}</div>
          </div>
          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={!isValid()}>
              
              {!message.id && <span>Send message</span>}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default MessageBox;
