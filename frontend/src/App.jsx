import { useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000";

function App() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    about: "",

    degree: "",
    institution: "",
    year: "",

    skills: "",

    projectName: "",
    projectDescription: "",
    projectTechnology: "",

    github: "",
    linkedin: "",
    website: ""
  });

  const [portfolio, setPortfolio] = useState(null);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  // GENERATE ABOUT
  const generateAbout = () => {

    if (!form.name || !form.title) {
      alert("Please enter your name and professional title first.");
      return;
    }

    const skills = form.skills
      ? form.skills.split(",").map(skill => skill.trim())
      : [];

    let generatedText =
      `Hello, I am ${form.name}, a ${form.title} with a strong interest in technology and continuous learning. `;

    if (skills.length > 0) {
      generatedText +=
        `I have skills in ${skills.slice(0, 5).join(", ")}. `;
    }

    if (form.projectName) {
      generatedText +=
        `I enjoy building practical projects such as ${form.projectName}. `;
    }

    generatedText +=
      `I am passionate about solving problems, learning new technologies, and creating useful digital solutions.`;

    setForm({
      ...form,
      about: generatedText
    });
  };


  // SAVE PORTFOLIO
  const savePortfolio = async () => {

    if (!form.name || !form.email) {
      alert("Please enter your name and email.");
      return;
    }

    setLoading(true);

    const portfolioData = {

      name: form.name,

      email: form.email,

      phone: form.phone,

      location: form.location,

      title: form.title,

      about: form.about,

      education: [
        {
          degree: form.degree,
          institution: form.institution,
          year: form.year
        }
      ],

      skills: form.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== ""),

      projects: [
        {
          name: form.projectName,
          description: form.projectDescription,
          technology: form.projectTechnology
        }
      ],

      socialLinks: {
        github: form.github,
        linkedin: form.linkedin,
        website: form.website
      }
    };


    try {

      const response = await axios.post(
        `${API_URL}/api/portfolio`,
        portfolioData
      );

      setMessage(response.data.message);

      setPortfolio({
        ...portfolioData,
        _id: response.data.portfolio._id
      });

    } catch (error) {

      console.log(error);

      setMessage("Error saving portfolio.");

    } finally {

      setLoading(false);

    }
  };


  // PREVIEW
  const createPreview = () => {

    const previewData = {

      name: form.name,

      email: form.email,

      phone: form.phone,

      location: form.location,

      title: form.title,

      about: form.about,

      education: [
        {
          degree: form.degree,
          institution: form.institution,
          year: form.year
        }
      ],

      skills: form.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== ""),

      projects: [
        {
          name: form.projectName,
          description: form.projectDescription,
          technology: form.projectTechnology
        }
      ],

      socialLinks: {
        github: form.github,
        linkedin: form.linkedin,
        website: form.website
      }
    };

    setPortfolio(previewData);
  };


  return (

    <div className="app">

      <header className="header">

        <h1>Portfolio Maker</h1>

        <p>
          Create your professional portfolio easily
        </p>

      </header>


      <main className="container">

        <section className="form-section">

          <h2>Personal Information</h2>


          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />


          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />


          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />


          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />


          <input
            name="title"
            placeholder="Professional Title"
            value={form.title}
            onChange={handleChange}
          />


          <h2>About Me</h2>

          <textarea
            name="about"
            placeholder="Write something about yourself..."
            value={form.about}
            onChange={handleChange}
          />


          <button
            className="ai-button"
            onClick={generateAbout}
          >
            ✨ Generate About Me
          </button>


          <h2>Education</h2>


          <input
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
          />


          <input
            name="institution"
            placeholder="Institution"
            value={form.institution}
            onChange={handleChange}
          />


          <input
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
          />


          <h2>Skills</h2>


          <input
            name="skills"
            placeholder="React, JavaScript, Node.js, MongoDB"
            value={form.skills}
            onChange={handleChange}
          />


          <h2>Project</h2>


          <input
            name="projectName"
            placeholder="Project Name"
            value={form.projectName}
            onChange={handleChange}
          />


          <textarea
            name="projectDescription"
            placeholder="Project Description"
            value={form.projectDescription}
            onChange={handleChange}
          />


          <input
            name="projectTechnology"
            placeholder="Technologies Used"
            value={form.projectTechnology}
            onChange={handleChange}
          />


          <h2>Social Links</h2>


          <input
            name="github"
            placeholder="GitHub URL"
            value={form.github}
            onChange={handleChange}
          />


          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={handleChange}
          />


          <input
            name="website"
            placeholder="Personal Website URL"
            value={form.website}
            onChange={handleChange}
          />


          <div className="buttons">

            <button
              onClick={createPreview}
            >
              Preview Portfolio
            </button>


            <button
              onClick={savePortfolio}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Portfolio"}
            </button>

          </div>


          {message && (
            <p className="message">
              {message}
            </p>
          )}

        </section>


        {portfolio && (

          <section className="portfolio">

            <h1>{portfolio.name}</h1>

            <h3>{portfolio.title}</h3>


            <p>
              {portfolio.location}
            </p>


            <p>
              {portfolio.email}
            </p>


            <p>
              {portfolio.phone}
            </p>


            <hr />


            <h2>About Me</h2>

            <p>
              {portfolio.about}
            </p>


            <h2>Education</h2>

            {portfolio.education.map((edu, index) => (

              <div key={index}>

                <h3>
                  {edu.degree}
                </h3>

                <p>
                  {edu.institution}
                </p>

                <p>
                  {edu.year}
                </p>

              </div>

            ))}


            <h2>Skills</h2>

            <div className="skills">

              {portfolio.skills.map((skill, index) => (

                <span key={index}>
                  {skill}
                </span>

              ))}

            </div>


            <h2>Projects</h2>

            {portfolio.projects.map((project, index) => (

              <div
                className="project"
                key={index}
              >

                <h3>
                  {project.name}
                </h3>

                <p>
                  {project.description}
                </p>

                <p>
                  <strong>
                    Technologies:
                  </strong>{" "}
                  {project.technology}
                </p>

              </div>

            ))}


            <h2>Social Links</h2>

            <div className="links">

              {portfolio.socialLinks.github && (
                <a
                  href={portfolio.socialLinks.github}
                  target="_blank"
                >
                  GitHub
                </a>
              )}


              {portfolio.socialLinks.linkedin && (
                <a
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                >
                  LinkedIn
                </a>
              )}


              {portfolio.socialLinks.website && (
                <a
                  href={portfolio.socialLinks.website}
                  target="_blank"
                >
                  Website
                </a>
              )}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default App;