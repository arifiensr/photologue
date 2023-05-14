import { useRef, useState } from 'react'
import psApi from '../../api/psApi'
import './updatepost.scss'

export default function UpdatePost({ post }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const [images, setImages] = useState()
  const [imagesPreview, setImagesPreview] = useState(post.imageUrl)
  const updatePostCaptionRef = useRef(post.caption)

  function handleImages(e) {
    setImages(e.target.files[0])
    setImagesPreview(URL.createObjectURL(e.target.files[0]))
  }

  async function updatePost(e) {
    e.preventDefault()

    let imageUrl = { url: post.imageUrl }

    if (images) {
      const formData = new FormData()
      formData.append('image', images)

      imageUrl = await psApi.uploadImage(formData, token)
    }

    const data = {
      imageUrl: imageUrl.url,
      caption: updatePostCaptionRef.current.value,
    }

    const updatePost = await psApi.updatePost(post.id, data, token)
    alert(updatePost.message)
  }

  return (
    <>
      <div className="modal fade updatePost" id={`updatePostModal${post.id}`} tabIndex={-1} aria-labelledby="updatePostModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content border-primary">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-primary" id="updatePostModalLabel">
                Update Post
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-upload">
                  <label htmlFor="chooseImage" className="form-label">
                    <i className="bx bxs-cloud-upload"></i> Choose Image
                  </label>
                  <input id="chooseImage" type="file" accept="image/*" onChange={handleImages} className="form-control" required />
                </div>
                <div className="input-box">
                  <span className="input-box__icon">
                    <i className="bx bxs-edit"></i>
                  </span>
                  <input ref={updatePostCaptionRef} defaultValue={post.caption} type="text" autoComplete="new-password" required />
                  <label>Caption</label>
                </div>
              </form>
              <div className="mb-3 image-preview">
                <img src={imagesPreview} alt="" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={updatePost}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
