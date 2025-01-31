"use client"

import { useState } from "react"
import styles from "./section5.module.css"

export default function StudentForm() {
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    cgpa: "",
    branch: "",
    doubtType: "academic",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Submitted:", formData)
    alert("Your form has been submitted!")
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Student Form</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Student UID:
          <input 
            className={styles.inputField} 
            type="text" 
            name="uid" 
            value={formData.uid} 
            onChange={handleChange} 
            required 
          />
        </label>
        

        <label className={styles.label}>
          Name:
          <input 
            className={styles.inputField} 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label className={styles.label}>
          CGPA:
          <input 
            className={styles.inputField} 
            type="number" 
            step="0.01" 
            name="cgpa" 
            min="0" 
            max="10" 
            value={formData.cgpa} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label className={styles.label}>
          Branch:
          <input 
            className={styles.inputField} 
            type="text" 
            name="branch" 
            value={formData.branch} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label className={styles.label}>
          Doubt Type:
          <select 
            className={styles.selectField} 
            name="doubtType" 
            value={formData.doubtType} 
            onChange={handleChange}
          >
            <option value="academic">Academic Related</option>
            <option value="career">Career Related</option>
          </select>
        </label>

        <label className={styles.label}>
        Relevant Contact Person:
          <select 
            className={styles.selectField} 
            name="contactPerson" 
            value={formData.doubtType} 
            onChange={handleChange}
          >
            <option value="mentor">Mentor</option>
            <option value="student coordinator">Student Coordinator</option>
          </select>
        </label>

        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  )
}
