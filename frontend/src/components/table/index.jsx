import React from "react";
import styles from './styles.module.css';
import {FiEdit} from "react-icons/fi";
import {MdDeleteForever} from "react-icons/md";

export function Table() {
  return (
	<table className={styles.userTable}>
		<thead>
			<tr>
				<th>Nombres</th>
				<th>Apellidos</th>
				<th>Correo</th>
				<th>Teléfono</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td><FiEdit/><MdDeleteForever/></td>
			</tr>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td><FiEdit/><MdDeleteForever/></td>
			</tr>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td><FiEdit/><MdDeleteForever/></td>
			</tr>
			<tr>
				<td>Cell 1</td>
				<td>Cell 2</td>
				<td>Cell 3</td>
				<td>Cell 4</td>
				<td><FiEdit/><MdDeleteForever/></td>
			</tr>
		</tbody>
	</table>
  );
}
