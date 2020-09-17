import React, { Fragment, useState } from 'react'
import Axios from "axios"

const FileUpload = () => {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productDescription: "",
    dateUploaded: "",
    dateEdited: ""
  })

  const { productName, productDescription, dateUploaded, dateEdited } = productInfo;

  const [file1, setFile1] = useState("")

  const [file2, setFile2] = useState("")

  const [fileName1, setFileName1] = useState("Choose file for product image 1")

  const [fileName2, setFileName2] = useState("Choose file for product image 2")

  const [uploadedFile, setUploadedFile] = useState({})

  const changeHandler = event => {
    setProductInfo({ [event.target.name]: event.target.value })
  }

  const imageInput1 = event => {
    setFile1(event.target.files[0]);
    setFileName1(event.target.files[0].name);
  }

  const imageInput2 = event => {
    setFile2(event.target.files[0]);
    setFileName2(event.target.files[0].name);
  }

  const submitHandler = async event => {
    event.preventDefault();
    console.log(productInfo);
    const formData = new FormData();
    formData.append("file", file1);

    try {
      const res = await Axios.post("/upload", formData, {
        headers: {
          "content-Type": "multipart/form-data"
        }
      });

      const { fileName1, filePath } = res.data;

      setUploadedFile({ fileName1, filePath })
      console.log("File Uploaded SuccessFully");

    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log("err.response.data.msg");
      }
    }
  }

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Product Name</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter product name" name="productName" value={productName} onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Product Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" name="productDescription" value={productDescription} onChange={changeHandler} rows="3"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Date Uploaded</label>
          <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Enter product name" name="dateUploaded" value={dateUploaded} onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Date Edited</label>
          <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Enter product name" name="dateEdited" value={dateEdited} onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Image Upload</label>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={imageInput1} />
            <label className="custom-file-label" htmlFor="inputGroupFile04">{fileName1}</label>
          </div>
          <div className="custom-file mt-2">
            <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={imageInput2} />
            <label className="custom-file-label" htmlFor="inputGroupFile04">{fileName2}</label>
          </div>
        </div>
        <input className="btn btn-primary btn-block mt-4" type="submit" value="Upload" />
      </form>
    </Fragment>
  )
}

export default FileUpload
