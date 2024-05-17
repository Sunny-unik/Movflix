import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

function AddMovieForm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    year: "",
    poster: "",
  });

  useEffect(() => {
    if (!user || !user.admin) navigate("/");
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setFormData({
      title: "",
      type: "",
      year: "",
      poster: "",
    });
  };

  return (
    <div className="container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="text"
            className="form-control"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="poster" className="form-label">
            Poster
          </label>
          <input
            type="text"
            className="form-control"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMovieForm;
