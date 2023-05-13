import { useEffect, useRef, useState } from 'react'
import './createpost.scss'
import psApi from '../../api/psApi'
import { Link } from 'react-router-dom'

export default function CreatePost() {
  const token = JSON.parse(localStorage.getItem('token'))
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState()
  const createPostCaptionRef = useRef()

  function handleImages(e) {
    setImages(e.target.files[0])
    setImagesPreview(URL.createObjectURL(e.target.files[0]))
  }

  async function createPost(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', images)

    const imageUrl = await psApi.uploadImage(formData, token)

    const data = {
      imageUrl: imageUrl.url,
      caption: createPostCaptionRef.current.value,
    }

    const newPost = await psApi.createPost(data, token)
    alert(newPost.message)
  }

  return (
    <>
      <div className="modal fade createPost" id={`createPostModal`} tabIndex={-1} aria-labelledby="createPostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="createPostModalLabel">
                Create Post
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="chooseImage" className="form-label">
                    Choose Image
                  </label>
                  <input type="file" accept="image/*" onChange={handleImages} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="caption" className="form-label">
                    Caption
                  </label>
                  <input ref={createPostCaptionRef} type="text" className="form-control" required />
                </div>
              </form>
              <div className="mb-3 image-preview">
                {images && (
                  <>
                    <img src={imagesPreview} alt="" />
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={createPost}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
