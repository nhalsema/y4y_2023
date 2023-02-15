import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    bilateral: "",
    timeMin: "",
    timeMax: "",
    benefitGen: "",
    sortOrder: "",
    enter: "",
    exit: "",
    mod: ""
  });
  const navigate = useNavigate();

  // desc: These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // desc: This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // desc: When a post request is sent to the create url, we'll add a new pose to the database.
    const newPose = { ...form };

    await fetch("http://localhost:5000/pose/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPose),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({
      name: "",
      desc: "",
      bilateral: "",
      timeMin: "",
      timeMax: "",
      benefitGen: "",
      sortOrder: "",
      enter: "",
      exit: "",
      mod: ""
    });
    navigate("/");
  }

  // desc: This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Pose</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Desc</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            value={form.desc}
            onChange={(e) => updateForm({ desc: e.target.value })}
          />
        </div>
        {/* MAKE THIS ONE A TOGGLE */}
        <div className="form-group">
          <label htmlFor="bilateral">Bilateral</label>
          <input
            type="checkbox"
            className="toggle-switch-checkbox"
            id="bilateral"
            value={form.bilateral}
            onChange={(e) => updateForm({ bilateral: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeMin">Time Min</label>
          <input
            type="text"
            className="form-control"
            id="timeMin"
            value={form.timeMin}
            onChange={(e) => updateForm({ timeMin: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeMax">Time Max</label>
          <input
            type="text"
            className="form-control"
            id="timeMax"
            value={form.timeMax}
            onChange={(e) => updateForm({ timeMax: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="benefit">Benefit</label>
          <input
            type="text"
            className="form-control"
            id="benefit"
            value={form.benefit}
            onChange={(e) => updateForm({ benefit: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sortOrder">Sort Order</label>
          <input
            type="text"
            className="form-control"
            id="sortOrder"
            value={form.sortOrder}
            onChange={(e) => updateForm({ sortOrder: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="enter">Enter</label>
          <input
            type="text"
            className="form-control"
            id="enter"
            value={form.enter}
            onChange={(e) => updateForm({ enter: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Exit">Exit</label>
          <input
            type="text"
            className="form-control"
            id="Exit"
            value={form.exit}
            onChange={(e) => updateForm({ exit: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Mod">Mod</label>
          <input
            type="text"
            className="form-control"
            id="Mod"
            value={form.mod}
            onChange={(e) => updateForm({ mod: e.target.value })}
          />
        </div>
        {/* <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">Senior</label>
          </div>
        </div>  */}
        <div className="form-group">
          <input
            type="submit"
            value="Add Pose"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}