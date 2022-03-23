import React from "react";
import styles from './Table.module.css';
import {FiEdit} from "react-icons/fi";
import {MdDeleteForever} from "react-icons/md";

export function Table(props) {
	const {tableList} = props
  return (
	<table className={styles.userTable}>
		<thead>
			<tr>
				<th>Nombres</th>
				<th>Apellidos</th>
				<th>Correo</th>
				<th>Teléfono</th>
				<th>Editar</th>
				<th>Eliminar</th>
			</tr>
		</thead>
		<tbody>
			{tableList.map((admin) => {
				return(
					<tr>
				<td>{admin.firstName + " " + admin.middleName}</td>
				<td>{admin.lastName + " " + admin.secondSurname}</td>
				<td>{admin.email}</td>
				<td>{admin.contactNumber}</td>
				<td><button className={styles.edit}><FiEdit/></button></td>
				<td><button className={styles.delete}><MdDeleteForever/></button></td>
			</tr>
				)
			})}
			
		</tbody>
	</table>
  );
}
