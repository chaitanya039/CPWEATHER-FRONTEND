import React from 'react';

const Modal = ({ openModal, setLang, lang }) => 
{
  // Create handleOnChange

  const handleOnChange = (e) =>
  {
    setLang(e.target.value);
  }

  return (
    <div className='modalBackground'>
        <div className="modalContainer">
        <button className='close-btn' onClick={ () => openModal(false) }> <i class="fas fa-times"></i> </button>
            <div className="title">
                <h1>Setup language as your choice ?</h1>
                <p>( Now see weather information according your convience ! )</p>
            </div>
            <div className="body">
                <div className="row">
                    <input type="radio" name='language' value = {`en`} id='english' checked = {lang === `en`} onChange={handleOnChange} />
                    <label htmlFor="english">English</label>
                </div>
                <div className="row">
                    <input type="radio" name='language' value ={`hi`} id='hindi' checked = {lang === `hi`} onChange={handleOnChange} />
                    <label htmlFor="hindi">Hindi</label>
                </div>
                <div className="row">
                    <input type="radio" name='language' value ={`fr`} id='french' checked = {lang === `fr`} onChange={handleOnChange} />
                    <label htmlFor="french">French</label>
                </div>
                <div className="row">
                    <input type="radio" name='language' value ={`it`} id='italian' checked = {lang === `it`} onChange={handleOnChange} />
                    <label htmlFor="italian">Italian</label>
                </div>
                <div className="row">
                    <input type="radio" name='language' value ={`ru`} id='russian' checked = {lang === `ru`} onChange={handleOnChange} />
                    <label htmlFor="russian">Russian</label>
                </div>
            </div>
            <div className="modal-footer">
                <button className="" onClick={ () => openModal(false) } > Done </button>
            </div>
        </div>
    </div>
  )
}

export default Modal;