import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pose = (props) => (
  <tr>
    <td>{props.pose.name}</td>
    <td>{props.pose.desc}</td>
    <td>{props.pose.bilateral.toString()}</td>
    <td>{props.pose.timeMin}</td>
    <td>{props.pose.timeMax}</td>
    <td>{props.pose.benefitGen}</td>
    <td>{props.pose.sortOrder}</td>
    <td>{props.pose.enter}</td>
    <td>{props.pose.exit}</td>
    <td>{props.pose.mod}</td>
    <td>
     <Link className="btn btn-link" to={`/edit/${props.pose._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deletePose(props.pose._id);
       }}
     >
       Delete
     </button>
   </td>
  </tr>
);

export default function PoseList() {
  const [poses, setPoses] = useState([]);

  // This method fetches the poses from the database.
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

  // This method will delete a pose
   async function deletePose(id) {
     await fetch(`http://localhost:5000/${id}`, {
       method: "DELETE"
     });

     const newPoses = poses.filter((el) => el._id !== id);
     setPoses(newPoses);
   }

  // This method will map out the poses on the table
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

  // This following section will display the table with the poses of individuals.
  return (
    <div>
      <h3>POSE LIBRARY</h3>
      {/* filter bar  */}

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Bilateral</th>
            <th>Time Min</th>
            <th>Time Max</th>
            <th>Benefit</th>
            <th>Sort Order</th>
            <th>Enter</th>
            <th>Exit</th>
            <th>Modification</th>
          </tr>
        </thead>
        <tbody>{poseList()}</tbody>
      </table>
    </div>
  );
}