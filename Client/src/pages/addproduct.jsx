import { useState } from "react"

function AddProduct() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Product name is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!price || isNaN(price) || price <= 0) newErrors.price = "Enter a valid price"
    if (!image.trim()) newErrors.image = "Image URL is required"
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const foundErrors = validate()
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }
    console.log("Product to send:", { name, description, price, image })
    alert("Product added successfully!")
  }

  return (
    <div>
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
        </div>
        <div>
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
        </div>
        <div>
          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct