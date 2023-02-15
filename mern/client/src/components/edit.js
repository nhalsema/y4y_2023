import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
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
    mod: "",
    poses: [],
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/pose/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const pose = await response.json();
      if (!pose) {
        window.alert(`Pose with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(pose);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // desc: These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      desc: form.desc,
      bilateral: form.bilateral,
      timeMin: form.timeMin,
      timeMax: form.timeMax,
      benefitGen: form.benefitGen,
      sortOrder: form.sortOrder,
      enter: form.enter,
      exit: form.exit,
      mod: form.mod,
    };

    // desc: This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // desc: This following section will display the form that takes input from the user to update the data.
  return (
    // bug: HERE NEED TO UPDATE
    <div>
      <h3>Update Pose</h3>
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
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Pose"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}