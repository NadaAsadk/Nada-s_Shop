import React from 'react'
import './NotFound.css'
export default function NotFound() {
    return (
        <div className="mainn">
  <div className="alert alert-danger" role="alert">
    <svg className="alertIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
    <h1>Ooops...</h1>
    <p>Somthing went WRONG!</p>
  </div>
</div>

        
    )
}
