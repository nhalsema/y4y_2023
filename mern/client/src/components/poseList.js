import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/poseLists.module.css";

const Pose = (props) => (
  <tr className={styles.table__pose}>
    <tr><div className={styles.tmpImg}>IMG</div></tr>
    <tr>{props.pose.name}</tr>
    {/* note: i'm not sure what i want to do with this  */}
    {/* <td>{props.pose.desc}</td>
    <td>{props.pose.bilateral.toString()}</td>
    <td>{props.pose.timeMin}</td>
    <td>{props.pose.timeMax}</td>
    <td>{props.pose.benefitGen}</td>
    <td>{props.pose.sortOrder}</td>
    <td>{props.pose.enter}</td>
    <td>{props.pose.exit}</td>
    <td>{props.pose.mod}</td> */}
    <tr>
      <Link className="btn btn-link" to={`/edit/${props.pose._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deletePose(props.pose._id);
        }}
      >
        Delete
      </button>
    </tr>
  </tr>
);

export default function PoseList() {
  const [poses, setPoses] = useState([]);

  // desc: This method fetches the poses from the database.
  useEffect(() => {
    async function getPoses() {
      const response = await fetch(`http://localhost:5000/pose/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const poses = await response.json();
      setPoses(poses);
    }

    getPoses();

    return;
  }, [poses.length]);

  // desc: This method will delete a pose
  async function deletePose(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newPoses = poses.filter((el) => el._id !== id);
    setPoses(newPoses);
  }

  // desc: This method will map out the poses on the table
  function poseList() {
    return poses.map((pose) => {
      return (
        <Pose
          pose={pose}
          deletePose={() => deletePose(pose._id)}
          key={pose._id}
        />
      );
    });
  }

  // desc: This following section will display the table with the poses of individuals.
  return (
    <div>
      <h3>POSE LIBRARY</h3>
      <table className={styles.table} style={{ marginTop: 20 }}>
        {/* filter bar  */}
        <thead className={styles.table__filters}>
          <tr>
            <td>filter</td>
            <td>filter 2</td>
            <td>filter 3</td>
            <td>search</td>
          </tr>
        </thead>
        <tbody>{poseList()}</tbody>
      </table>
    </div>
  );
}